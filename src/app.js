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
      /**
       * loaders
       */
      await loaders({ expressApp: this.app })

      /**
       * load Routes
       */
      this.routes(routes)

      /**
       * Run app
       */
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

  routes (routes, parentUrl = '', parentMiddleware = []) {
    _.forEach(routes, (route) => {
      let currentMiddleware = []
      route.url             = parentUrl + route.url

      /**
       * init middleware and convert to array
       */
      if (route.middleware) {
        if ((typeof route.middleware) === 'function') {
          route.middleware = [route.middleware]
        }

        currentMiddleware = currentMiddleware.concat(route.middleware)
        currentMiddleware = currentMiddleware.concat(parentMiddleware)
      } else {
        currentMiddleware = currentMiddleware.concat(parentMiddleware)
      }

      /**
       * if have child -> call again
       */
      if (route.child) {
        route.middleware = currentMiddleware
        this.routes(route.child, route.url, route.middleware)
      }

      /**
       * register route
       */
      if (route.route) {
        this.registerRoute(route, currentMiddleware)
      }
    })
  }

  registerRoute (route, parentMiddlewareCurrent) {
    /**
     * if have middleware
     */
    if (route.middleware && route.route) {
      this.app.use(route.url, this.baseMiddleware(parentMiddlewareCurrent), route.route)
    }

    /**
     * if not have middleware
     */
    if (route.route && !route.middleware) {
      this.app.use(route.url, route.route)
    }
  }

  baseMiddleware (arrayMiddleware) {
    /**
     * return next or fail
     */
    return (req, res, next) => {
      let responseError = {}

      _.forEach(arrayMiddleware, (middleware) => {
        if (middleware(req).status === false) {
          responseError = middleware(req)
        }
      })

      if (responseError.status === false) {
        return res.status(responseError.code).json(responseError)
      } else {
        return next()
      }
    }
  }
}

/**
 * start app
 * @type {Server}
 */
const server = new Server()
server.start()
      .then(success => {
      })
      .catch(error => {
        log.error(error)
        console.error(error)
      })