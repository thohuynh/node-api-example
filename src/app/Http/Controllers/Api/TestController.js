import Base from '../BaseController'

class TestController extends Base {
  test (req, res) {
    try {
      let response = this.response.Ok(req.body.email)

      return res.status(response.code).json(response)
    } catch (err) {
      console.error(err)

      return res.status(500).json(this.response.Error())
    }
  }
}

export default new TestController()