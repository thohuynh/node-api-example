import { Router } from 'express'
import wrap from 'express-async-wrap'
import UserController from '../../app/Http/Controllers/Api/UserController'

const router = Router()

router.get('/', wrap( async (req, res) => {
  return await UserController.all(req, res)
}))

export default router