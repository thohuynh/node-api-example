import BaseRepository from './Core/BaseRepository'
import UserModel from '../Entities/User'

class UserRepository extends BaseRepository{
  constructor () {
    super()
  }

  _model () {
    super._model(UserModel);
  }
}

export default new UserRepository()