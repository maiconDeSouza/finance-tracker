import { FastifyInstance } from 'fastify'
import { transactionsControllers } from '../controllers/transactionsControllers'
import { tokenJWTValidation } from '../middlewares/tokenJWTValidation'

export async function transactionsRoutes(app: FastifyInstance) {
  const controllers = await transactionsControllers()
  app.post(
    '/transactions/:user_id',
    {
      preHandler: tokenJWTValidation,
    },
    controllers.createTransactions,
  )
}
