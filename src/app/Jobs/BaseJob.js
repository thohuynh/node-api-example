import DB from '../../database/Base'
import Agenda from 'agenda'

export default class BaseJob {
  constructor () {
    this.agenda  = new Agenda()
    this.db_name = 'jobs'
  }

  async init () {
    const connect = await DB()

    return this.agenda.mongo(connect, this.db_name)
  }

  async schedule (name, time, data = null) {
    const agenda = await this.init()

    agenda.define(name, this.jobFunction);
    agenda.schedule(time, name, data);

    return agenda.start()
  }

  async every (name, time, data = null) {
    const agenda = await this.init()

    agenda.define(name, this.jobFunction);
    agenda.every(time, name, data);

    return agenda.start()
  }

  jobFunction (job) {

  }
}