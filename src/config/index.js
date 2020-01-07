import 'dotenv/config'
import app from './app'
import database from './database'
import mail from './mail'

export default {
  app: app,
  database: database,
  mail: mail
}