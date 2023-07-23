import { FastifyInstance } from 'fastify'
import { financialControlControllers } from '../controllers/financialControlControllers'
import { tokenJWTValidation } from '../middlewares/tokenJWTValidation'

export async function financialControlRoutes(app: FastifyInstance) {
  const controllers = await financialControlControllers()
  app.get(
    '/financial-control/month/:id',
    {
      preHandler: tokenJWTValidation,
    },
    controllers.getOrCreateTransactionsOfMonth,
  )
}
