import GetAllUserTask from '../Tasks/GetAllUserTask'
import Action from '../../Action'

class GetAllUserAction extends Action {

  async run () {
    return await GetAllUserTask.run()
  }
}

export default new GetAllUserAction()