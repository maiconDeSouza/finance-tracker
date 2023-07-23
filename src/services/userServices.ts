import { AppError } from '../AppErros/AppErros'
import { userRepositories } from '../models/repositories/usersRepositories'
import { utilsHashPassword } from '../utils/utilsHashPassword'

async function create(
  name: string,
  nickname: string,
  password: string,
  repeatPassword: string,
) {
  if (password !== repeatPassword) {
    throw new AppError(
      'Unexpected error on the server, please try again or try later.',
      400,
    )
  }

  const hashPassword = await utilsHashPassword(password)

  const repositories = await userRepositories()
  const userNickname = await repositories.findNickname(nickname)

  if (userNickname) {
    throw new AppError('Nickname is already in use.', 409)
  }

  const newUsers = await repositories.createUsers(name, nickname, hashPassword)

  if (!newUsers) {
    throw new AppError(
      'Unexpected error on the server, please try again or try later.',
      500,
    )
  }
  return newUsers
}

export async function usersServices() {
  return { create }
}
