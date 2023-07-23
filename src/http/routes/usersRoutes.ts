import { FastifyInstance } from 'fastify'
import { usersControllers } from '../controllers/usersControllers'

export async function usersRoutes(app: FastifyInstance) {
  const controllers = await usersControllers()
  app.post('/users', controllers.create)
  app.post('/users/login', controllers.login)
}
