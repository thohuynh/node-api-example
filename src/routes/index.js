import Middleware from '../app/Http/Middleware'
import test from './api/test'
import user from './api/user'

export default [
  {
    url: '/api',
    child: [
      {
        url: '/test',
        middleware: Middleware.auth,
        route: test
      },
      {
        url: '/user',
        route: user,
        child: [
          {
            url: '/test',
            route: test
          }
        ]
      },
    ]
  },
  {
    url: '/web-api/',
    route: user
  },
  {
    url: '/web/',
    middleware: Middleware.auth,
    route: user
  }
]