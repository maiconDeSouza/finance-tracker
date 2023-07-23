import { dbPrisma } from '../prisma/transactionsPrisma'

async function findIdFincialControlMonth(user_id: string, name: string) {
  const db = await dbPrisma()
  const financial_control_id = await db.findIdFincialControlMonth(user_id, name)

  return financial_control_id
}

async function createTransacitons(
  financial_control_id: string,
  description: string,
  amount: number,
) {
  const db = await dbPrisma()
  const newTransaction = await db.createTransacitons(
    financial_control_id,
    description,
    amount,
  )
  return newTransaction
}

async function findAllTransactionMonth(financial_control_id: string) {
  const db = await dbPrisma()

  const allTransactionMonth = await db.findAllTransactionMonth(
    financial_control_id,
  )
  return allTransactionMonth
}

async function updateBalanceUser(user_id: string, total_balance: number) {
  const db = await dbPrisma()

  const totalBalance = await db.updateBalanceUser(user_id, total_balance)

  return totalBalance
}

async function updateFinancialControlBalanceMoth(
  financial_control_id: string,
  total_incomes: number,
  total_expenses: number,
) {
  const db = await dbPrisma()

  const financialControlBalanceMonth =
    await db.updateFinancialControlBalanceMoth(
      financial_control_id,
      total_incomes,
      total_expenses,
    )

  return financialControlBalanceMonth
}

export async function transactionsRepositories() {
  return {
    findIdFincialControlMonth,
    createTransacitons,
    findAllTransactionMonth,
    updateBalanceUser,
    updateFinancialControlBalanceMoth,
  }
}
