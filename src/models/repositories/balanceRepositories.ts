import { dbPrisma } from '../prisma/balancePrimas'

async function findAllBalances(user_id: string, transaction_id: string) {
  const db = await dbPrisma()

  const balance = await db.findAllBalances(user_id, transaction_id)

  return balance
}

async function findFinancialControlID(user_id: string, name: string) {
  const db = await dbPrisma()

  const financial_control_id = await db.findFinancialControlID(user_id, name)

  return financial_control_id
}
export async function balanceRepositories() {
  return { findAllBalances, findFinancialControlID }
}
