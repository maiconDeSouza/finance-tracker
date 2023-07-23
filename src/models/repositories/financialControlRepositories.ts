import { dbPrisma } from '../prisma/financialControlPrisma'

async function findFinancialControlByName(name: string, id: string) {
  const db = await dbPrisma()

  const foundFinancialControlName = await db.findFinancialControlByName(
    name,
    id,
  )

  return foundFinancialControlName
}

async function createFinancialControl(name: string, id: string) {
  const db = await dbPrisma()
  const newFinancialControl = await db.createFinancialControl(name, id)

  return newFinancialControl
}

export async function financialControlRepositories() {
  return { findFinancialControlByName, createFinancialControl }
}
