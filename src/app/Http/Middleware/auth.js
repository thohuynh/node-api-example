import response from '../../Common/response'

export const authTest = (req) => {
  if (req.token === 'token_test') {
    //console.log(next())
    return response.Ok(true)
  }

  return response.Error('Unauthorized', 401)
}
