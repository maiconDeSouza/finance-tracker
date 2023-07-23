import { FastifyInstance } from 'fastify'
import { balanceControllers } from '../controllers/balanceControllers'
import { tokenJWTValidation } from '../middlewares/tokenJWTValidation'

export async function balanceRoutes(app: FastifyInstance) {
  const controllers = await balanceControllers()
  app.get(
    '/balances/:user_id',
    {
      preHandler: tokenJWTValidation,
    },
    controllers.getBalance,
  )
}
