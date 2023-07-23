import fastify from 'fastify'
import { usersRoutes } from '../http/routes/usersRoutes'
import { env } from './env'

const app = fastify()

const prefix = env.URL_API

app.register(usersRoutes, {
  prefix,
})

export { app }
