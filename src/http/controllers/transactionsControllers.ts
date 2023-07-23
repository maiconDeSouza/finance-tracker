import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { transactionsServices } from '../../services/transactionsServices'
import { handleCatchError } from '../../AppErros/handleCatchError'

async function createTransactions(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createTransactionsIdUserParamsSchema = z.object({
    user_id: z.string().uuid(),
  })
  const createTransactionsSubUserSchema = z.object({
    sub: z.string().uuid(),
  })
  const createTransactionBodySchema = z.object({
    description: z.string().min(3).max(100),
    amount: z.number(),
  })

  const { user_id } = createTransactionsIdUserParamsSchema.parse(request.params)
  const { sub } = createTransactionsSubUserSchema.parse(request.user)
  const { description, amount } = createTransactionBodySchema.parse(
    request.body,
  )
  try {
    const services = await transactionsServices()
    const newTransaction = await services.createTransactions(
      user_id,
      sub,
      description,
      amount,
    )
    reply.status(201).send({
      code: 201,
      newTransaction,
    })
  } catch (error) {
    handleCatchError(error, reply)
  }
}

export async function transactionsControllers() {
  return { createTransactions }
}
