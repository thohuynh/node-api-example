import { Router } from 'express'
import TestController from '../../app/Http/Controllers/Api/TestController'
import Requests from '../../app/Http/Requests'

const router = Router()

router.post('/', Requests.TestRequest, (req, res) => {
  return TestController.test(req, res)
})

export default router