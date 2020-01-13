import Middleware from '../app/Http/Middleware'
import test from './api/test'
import user from './api/user'

export default [
  {
    url: '/api',
    middleware: Middleware.auth,
    child: [
      {
        url: '/test',
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