import loaders from './loaders'
import express from 'express'
import _ from 'lodash'
import http from 'http'
import SocketServer from './modules/Socket/socketServer'
import config from './config'
import routes from './routes'
import log from './app/Heplers/log'

class Server {
  constructor () {
    this.app = express()
  }

  async start () {
    try {
      // loaders
      await loaders({ expressApp: this.app })

      // Routes
      this.routes(routes)

      // Run app
      if (config.app.useSocket) {
        const server = http.Server(this.app)

        new SocketServer(server, config.app.port)
      } else {
        this.app.listen(config.app.port, err => {
          if (err) {
            console.log(err)
            return
          }
          console.log(`Your server is ready in port ${ config.app.port } !`)
        })
      }
    } catch (exception) {
      throw new Error(exception)
    }
  }

  routes (routes, parentUrl = '', parentMiddleware = (req, res, next) => { next() }) {
    _.forEach(routes, (route) => {
      route.url = parentUrl + route.url
      let parentMiddlewareCurrent = []

      if (route.middleware) {
        parentMiddlewareCurrent.push(route.middleware)
        parentMiddlewareCurrent.push(parentMiddleware)
        route.middleware = parentMiddlewareCurrent

      } else {
        parentMiddlewareCurrent.push(parentMiddleware)
        route.middleware = parentMiddlewareCurrent
      }

      if (route.child) {
        this.routes(route.child, route.url, route.middleware)
      }

      if (route.route) {
        this.registerRoute(route, parentMiddlewareCurrent)
      }
    })
  }

  registerRoute (route, parentMiddlewareCurrent) {
    console.log(route.url)
    console.log(parentMiddlewareCurrent)

    if (route.middleware && route.route) {
      this.app.use(route.url, route.middleware, route.route)
    }

    if (route.route && !route.middleware) {
      this.app.use(route.url, route.route)
    }
  }

  baseMiddleware (error, req, res, next) {
    return next()
  }
}

const server = new Server()
server.start()
      .then(success => {
      })
      .catch(error => {
        log.error(error)
        console.error(error)
      })