import express from 'express'
import cors from 'cors'
import bearerToken from 'express-bearer-token'

export default async ({ app }) => {
  app.enable('trust proxy')
  app.use(cors())
  app.use(bearerToken())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Return the express app
  return app
}
