export default class BaseRepository {
  constructor () {
    this.model = {}
    this._model()
  }

  _model (model) {
    this.model = model
  }

  async all () {
    return await this.model.find({})
  }

  find (id, attributes = '') {

  }

  findOneWhere (where, attributes = '') {

  }

  findByField (field, value, attributes = '') {

  }

  findWhere (where, attributes = '') {

  }

  findWhereIn (field, value = [], ) {

  }

  update (update, id) {

  }

  updateWhere (update, where) {

  }

  delete (id) {

  }
}