import 'dotenv/config'
import socket from 'socket.io'
import _ from 'lodash'
import config from './config'
import response from '../../app/Common/response'
import BaseHandler from '../Socket/Events/Handlers/baseHandler'
import { CONNECT_SOCKET_SERVER } from '../Socket/Events/Constants/events'

export default class SocketServer {
  constructor (server, port) {
    this.port          = port
    this.io            = socket.listen(server, { /* parser: customParser */ })
    this.handlers      = []
    this.userConnected = []

    server.listen(this.port, (error) => {
      if (error) {
        throw new Error(error)
      }

      console.log('Server listen on port ' + `${ this.port }`)
    })

    this.io.on('connection', (socket) => this.onConnection(socket))
    this.io.on('error', (error) => this.onError(error))
  }

  /*
   * SocketServer onConnection event
   */
  onConnection (socket) {
    this.applyAuthMiddleware(socket)

    socket.on('disconnect', (socket) => this.onDisconnect(socket))
  }

  /*
   * SocketServer onDisconnect event
   */
  onDisconnect (socket) {
  }

  setHandlers (socket) {
    this.handlers['baseHandler'] = new BaseHandler(socket, this.io)
  }

  applyAuthMiddleware (socket) {
    const self = this

    socket.authenticated = false
    socket.deviceName    = null

    socket.on(CONNECT_SOCKET_SERVER, (auth) => {
      if (self.checkAuthToken(auth.keyAccess)) {
        socket.authenticated = true
        socket.deviceName    = auth.deviceName

        self.setHandlers(socket)

        _.forEach(self.io.nsps, (nsp) => {
          if (_.has(nsp.sockets, socket.id)) {
            nsp.connected[socket.id] = socket

            if (!_.includes(self.userConnected, auth.deviceName)) {
              self.userConnected.push(auth.deviceName)
            }

            socket.emit(CONNECT_SOCKET_SERVER, response.Ok(true, 'connected'))
          }
        })
      }
    })

    // After 3 second, if user do not authentication, disconnect
    setTimeout(() => {
      if (!socket.authenticated) {
        socket.emit(CONNECT_SOCKET_SERVER, response.Error('unauthorized', 422))
        socket.disconnect('unauthorized')
      }
    }, 3000)
  }

  onError (error) {
    console.log(error)
  }

  checkAuthToken (keyAccess) {
    return keyAccess === config.keyAuth
  }
}