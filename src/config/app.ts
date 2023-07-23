import fastify from 'fastify'
import { usersRoutes } from '../http/routes/usersRoutes'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { financialControlRoutes } from '../http/routes/financialControlRoutes'

const app = fastify()

const prefix = env.URL_API
const secret = env.JWT_SECRET

app.register(fastifyJwt, {
  secret,
})

app.register(usersRoutes, {
  prefix,
})

app.register(financialControlRoutes, {
  prefix,
})

export { app }
