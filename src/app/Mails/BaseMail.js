import 'dotenv/config'
import _ from 'lodash'
import Mail from 'nodemailer'
import config from '../../config'

export default class BaseMail {
  constructor () {
    this.mail = Mail.createTransport({
      host:   config.mail.host,
      port:   config.mail.port,
      secure: false,
      auth:   {
        user: config.mail.user,
        pass: config.mail.pass
      }
    })
  }

  send (mail, subject, content) {
    let result = this.mail.sendMail({
      from:    'test@mail.com', // sender address
      to:      mail, // list of receivers
      subject: subject, // Subject line
      text:    content, // plain text body,
    })

    result.then((result) => {}).catch((error) => { console.log(error) })
  }

  sendMany (subject, content, ... mails) {
    _.forEach(mails, (mail) => {
      this.mail.sendMail({
        from:    'test@mail.com', // sender address
        to:      mail, // list of receivers
        subject: subject, // Subject line
        text:    content, // plain text body,
      })
    })
  }
}