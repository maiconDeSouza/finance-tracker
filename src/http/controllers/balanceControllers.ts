import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { balanceServices } from '../../services/balanceServices'
import { handleCatchError } from '../../AppErros/handleCatchError'

async function getBalance(request: FastifyRequest, reply: FastifyReply) {
  const getBalanceIdUserParamsSchema = z.object({
    user_id: z.string().uuid(),
  })
  const getBalanceSubUserSchema = z.object({
    sub: z.string().uuid(),
  })

  const { user_id } = getBalanceIdUserParamsSchema.parse(request.params)
  const { sub } = getBalanceSubUserSchema.parse(request.user)

  try {
    const services = await balanceServices()
    const balances = await services.getBalance(user_id, sub)
    reply.status(200).send({
      balances,
    })
  } catch (error) {
    handleCatchError(error, reply)
  }
}
export async function balanceControllers() {
  return { getBalance }
}
