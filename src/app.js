import loaders from './loaders'
import express from 'express'
import http from 'http'
import SocketServer from './modules/Socket/socketServer'
import config from './config'
import Middleware from './app/Http/Middleware'
import api from "./routes";

async function startServer () {
  const app = express();

  try {
    await loaders({ expressApp: app })

    // Route api
    app.use('/api/test', Middleware.auth, api.test)
    app.use('/api/user', Middleware.auth, api.user)

    /**
     * if use socket => uncomment here
     */

    const server = http.Server(app)

    new SocketServer(server, config.app.port)

    /**
     * if don't use socket => uncomment here
     */

    // app.listen(config.app.port, err => {
    //   if (err) {
    //     console.log(err)
    //     return
    //   }
    //   console.log(`Your server is ready in port ${ config.app.port } !`)
    // })

  } catch (exception) {
    console.error(exception)

    // handle exception
  }
}

startServer()