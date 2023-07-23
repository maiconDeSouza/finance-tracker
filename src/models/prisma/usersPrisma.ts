import { prismaClient } from '../../config/prismaClient'

async function findNickname(nickname: string) {
  const userNickname = await prismaClient.user.findUnique({
    where: {
      nickname,
    },
    select: {
      id: true,
      nickname: true,
      password: true,
    },
  })
  return userNickname
}
async function createUsers(
  name: string,
  nickname: string,
  hashPassword: string,
) {
  const newUser = await prismaClient.user.create({
    data: {
      name,
      nickname,
      password: hashPassword,
    },
    select: {
      id: true,
      nickname: true,
    },
  })

  return newUser
}

export async function dbPrisma() {
  return { findNickname, createUsers }
}
