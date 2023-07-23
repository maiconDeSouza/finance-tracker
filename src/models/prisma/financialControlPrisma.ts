import { prismaClient } from '../../config/prismaClient'

async function findFinancialControlByName(name: string, id: string) {
  const foundName = await prismaClient.financialControl.findMany({
    where: {
      AND: [{ user_id: id }, { name }],
    },
  })

  return foundName
}

async function createFinancialControl(name: string, id: string) {
  const newFinancialControl = await prismaClient.financialControl.create({
    data: {
      name,
      user_id: id,
    },
  })
  return newFinancialControl
}

export async function dbPrisma() {
  return { findFinancialControlByName, createFinancialControl }
}
