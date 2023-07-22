import fastify from 'fastify'
import { userRoutes } from '../http/routes/userRoutes'
import { env } from './env'

const app = fastify()

const prefix = env.URL_API

app.register(userRoutes, {
  prefix,
})

export { app }
