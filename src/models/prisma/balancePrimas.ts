import { prismaClient } from '../../config/prismaClient'

async function findAllBalances(user_id: string, financial_control_id: string) {
  const total_balance = await prismaClient.user.findFirst({
    where: {
      id: user_id,
    },
    select: { total_balance: true },
  })
  const total_incomes = await prismaClient.financialControl.findFirst({
    where: {
      id: financial_control_id,
    },
    select: {
      total_incomes: true,
    },
  })
  const total_expenses = await prismaClient.financialControl.findFirst({
    where: {
      id: financial_control_id,
    },
    select: {
      total_expenses: true,
    },
  })

  return {
    total_balance,
    total_incomes,
    total_expenses,
  }
}

async function findFinancialControlID(user_id: string, name: string) {
  const financialControlId = await prismaClient.financialControl.findFirst({
    where: {
      user_id,
      name,
    },
    select: {
      id: true,
    },
  })

  return financialControlId
}

export async function dbPrisma() {
  return { findAllBalances, findFinancialControlID }
}
