import { FastifyReply, FastifyRequest } from 'fastify'
import { string, z } from 'zod'
import { usersServices } from '../../services/userServices'
import { handleCatchError } from '../../AppErros/handleCatchError'

async function create(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: string().max(50),
    nickname: string().min(3).max(12),
    password: string().min(6).max(23),
    repeatPassword: string().min(6).max(23),
  })

  const { name, nickname, password, repeatPassword } =
    createUserBodySchema.parse(request.body)

  try {
    const services = await usersServices()
    const newUsers = await services.create(
      name,
      nickname,
      password,
      repeatPassword,
    )
    reply.status(201).send({
      code: 201,
      message: `User successfully created with ID ${newUsers.id} and nickname ${newUsers.nickname}`,
    })
  } catch (error) {
    handleCatchError(error, reply)
  }
}

async function login(request: FastifyRequest, reply: FastifyReply) {
  const loginUserBodySchema = z.object({
    nickname: z.string(),
    password: z.string(),
  })

  const { nickname, password } = loginUserBodySchema.parse(request.body)

  try {
    const services = await usersServices()
    const userID = await services.login(nickname, password)

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: userID,
        },
      },
    )
    reply.status(200).send({
      code: 200,
      message: `Login successful.`,
      userID,
      token,
    })
  } catch (error) {
    handleCatchError(error, reply)
  }
}

export async function usersControllers() {
  return { create, login }
}
