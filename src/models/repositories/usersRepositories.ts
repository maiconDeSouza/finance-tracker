import { dbPrisma } from '../prisma/usersPrisma'

async function findNickname(nickname: string) {
  const db = await dbPrisma()

  const returNickname = await db.findNickname(nickname)

  if (returNickname) {
    const { id, nickname: nick } = returNickname
    const userNickname = {
      id,
      nickname: nick,
    }

    return userNickname
  }

  return null
}

async function findNicknamePassword(nickname: string) {
  const db = await dbPrisma()

  const userNickname = await db.findNickname(nickname)

  return userNickname
}

async function createUsers(
  name: string,
  nickname: string,
  hashPassword: string,
) {
  const db = await dbPrisma()

  const newUsers = await db.createUsers(name, nickname, hashPassword)

  return newUsers
}
export async function userRepositories() {
  return { findNickname, findNicknamePassword, createUsers }
}
