import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { financialControlServices } from '../../services/financialControlServices'
import { handleCatchError } from '../../AppErros/handleCatchError'

async function getOrCreateTransactionsOfMonth(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const financialControlMonthParamsSchema = z.object({
    id: z.string(),
  })
  const financialControlMonthUserSchema = z.object({
    sub: z.string(),
  })
  const { id } = financialControlMonthParamsSchema.parse(request.params)
  const { sub } = financialControlMonthUserSchema.parse(request.user)

  try {
    const services = await financialControlServices()
    const financialControlMonth = await services.getOrCreateTransactionsOfMonth(
      id,
      sub,
    )
    reply.status(200).send({
      code: 200,
      financialControlMonth,
    })
  } catch (error) {
    handleCatchError(error, reply)
  }
}

export async function financialControlControllers() {
  return { getOrCreateTransactionsOfMonth }
}
