import UserModel from '../../../Entities/User'
import Task from '../../Task'

class GetAllUserTask extends Task {

  async run () {
    return await UserModel.find({})
  }
}

export default new GetAllUserTask()