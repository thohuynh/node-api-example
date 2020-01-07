import { responseError} from '../../Common/response'

export const authTest = (req, res, next) => {
  if (req.token === 'token_test') {
    return next()
  }

  return res.status(401).json(responseError('Unauthorized', 401));
}