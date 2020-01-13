import 'dotenv/config'
import app from './app'
import database from './database'
import mail from './mail'
import s3 from './s3'
import log from './log'

export default {
  app: app,
  database: database,
  mail: mail,
  s3: s3,
  log: log
}