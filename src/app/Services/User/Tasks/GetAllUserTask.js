import UserRepository from '../../../Repositories/UserRepository'
import Task from '../../Task'

class GetAllUserTask extends Task {

  async run () {
    return await UserRepository.all()
  }
}

export default new GetAllUserTask()