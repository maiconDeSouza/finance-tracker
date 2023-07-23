import { FastifyReply } from 'fastify'
import { AppError } from './AppErros'

export function handleCatchError(error: unknown, reply: FastifyReply) {
  if (error instanceof Error) {
    return reply.status(500).send({
      code: 500,
      message: error.message,
    })
  }
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      code: error.statusCode,
      message: error.message,
    })
  }

  reply.status(500).send({
    code: 500,
    message: 'Unexpected error on the server, please try again or try later.',
  })
}
