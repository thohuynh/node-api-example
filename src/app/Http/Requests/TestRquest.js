import validator from 'validator'
import { responseError } from '../../Common/response'

export const TestRequest = (req, res, next) => {
  if (validator.isEmail(req.body.email)) {
    return next()
  } else {
    return res.status(402).json(responseError('validator fail', 402))
  }
}