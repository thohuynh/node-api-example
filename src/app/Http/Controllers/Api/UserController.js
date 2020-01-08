import Base from '../BaseController'
import GetAllUserAction from '../../../Services/User/Actions/GetAllUserAction'

class UserController extends Base {
  constructor () {
    super();
  }

  async all (req, res) {
    try {
      let result   = await GetAllUserAction.run()
      let response = this.response.Ok(result)

      return res.status(response.code).json(response)
    } catch (err) {
      console.error(err)

      return res.status(500).json(this.response.Error())
    }
  }
}

export default new UserController()