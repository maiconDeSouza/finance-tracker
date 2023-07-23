import { dbPrisma } from '../prisma/usersPrisma'

async function findNickname(nickname: string) {
  const db = await dbPrisma()

  const userNickname = db.findNickname(nickname)

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
  return { findNickname, createUsers }
}
