import NotifyHandlerTest from './NotifyHandlerTest'

export default class BaseHandler {
  constructor (socket, io) {
    this.socket = socket
    this.io     = io

    new NotifyHandlerTest(socket, io)
  }
}
