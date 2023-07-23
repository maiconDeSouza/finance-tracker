import { prismaClient } from '../../config/prismaClient'

async function createTransacitons(
  financial_control_id: string,
  description: string,
  amount: number,
) {
  const newTransaction = await prismaClient.transaction.create({
    data: {
      financial_control_id,
      description,
      amount,
    },
  })
  return newTransaction
}

async function findIdFincialControlMonth(user_id: string, name: string) {
  const financial_control_id = await prismaClient.financialControl.findFirst({
    where: {
      AND: [{ user_id }, { name }],
    },
    select: {
      id: true,
    },
  })

  return financial_control_id
}

async function findAllTransactionMonth(financial_control_id: string) {
  const allTransactionMonth = await prismaClient.transaction.findMany({
    where: {
      financial_control_id,
    },
  })
  return allTransactionMonth
}

async function updateBalanceUser(user_id: string, total_balance: number) {
  const balanceUser = await prismaClient.user.update({
    where: {
      id: user_id,
    },
    data: {
      total_balance,
    },
  })

  return balanceUser
}

async function updateFinancialControlBalanceMoth(
  financial_control_id: string,
  total_incomes: number,
  total_expenses: number,
) {
  const financialControlBalanceMonth =
    await prismaClient.financialControl.updateMany({
      where: {
        id: financial_control_id,
      },
      data: {
        total_incomes,
        total_expenses,
      },
    })
  return financialControlBalanceMonth
}

export async function dbPrisma() {
  return {
    createTransacitons,
    findIdFincialControlMonth,
    findAllTransactionMonth,
    updateBalanceUser,
    updateFinancialControlBalanceMoth,
  }
}
