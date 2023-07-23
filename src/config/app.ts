import fastify from 'fastify'
import { usersRoutes } from '../http/routes/usersRoutes'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { financialControlRoutes } from '../http/routes/financialControlRoutes'
import { transactionsRoutes } from '../http/routes/transactionsRoutes'
import { balanceRoutes } from '../http/routes/balanceRoutes'

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

app.register(transactionsRoutes, {
  prefix,
})

app.register(balanceRoutes, {
  prefix,
})

export { app }
