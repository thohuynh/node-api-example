export default {
  port: process.env.SERVER_PORT,
  environment: process.env.APP_ENVIRONMENT,
  useSocket: (process.env.APP_USE_SOCKET === 'true')
}