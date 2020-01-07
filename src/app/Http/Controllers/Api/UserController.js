import Base from '../BaseController'
import GetAllUserAction from '../../../Services/User/Actions/GetAllUserAction'

class UserController extends Base {
  constructor () {
    super();
  }

  async all (req, res) {
    let result   = await GetAllUserAction.run()
    let response = this.response.Ok(result)

    return res.status(response.code).json(response)
  }
}

export default new UserController()