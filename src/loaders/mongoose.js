import mongoose from 'mongoose'
import config from '../config'

const conf = config

export default async () => {
  const connStr = `mongodb+srv://${ conf.database.userName }:${ conf.database.password }@${ conf.database.host }/${ conf.database.db }`
  const config  = {
    useNewUrlParser:    true,
    useFindAndModify:   false
  }

  const connection = await mongoose.connect(connStr, config);

  return connection.connection.db;
}