import Base from '../BaseController'

class TestController extends Base {
  test (req, res) {
    let response = this.response.Ok(req.body.email)

    return res.status(response.code).json(response)
  }
}

export default new TestController()