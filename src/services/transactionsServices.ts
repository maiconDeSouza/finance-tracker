import { AppError } from '../AppErros/AppErros'
import { transactionsRepositories } from '../models/repositories/transactionsRepositories'
import { utilsGenerateCustomDate } from '../utils/utilsGenerateCustomDate'
import { utilSumTransactions } from '../utils/utilsSumTransactions'

const utils = utilSumTransactions()

async function createTransactions(
  user_id: string,
  sub: string,
  description: string,
  amount: number,
) {
  if (user_id !== sub) {
    throw new AppError('Unauthorized.', 401)
  }
  const repositories = await transactionsRepositories()
  const financialControlName = utilsGenerateCustomDate()

  const financial_control_id = await repositories.findIdFincialControlMonth(
    user_id,
    financialControlName,
  )

  if (!financial_control_id) {
    throw new AppError('Unauthorized.', 401)
  }

  if (financial_control_id) {
    const financialControlId = financial_control_id.id

    const newTransaction = await repositories.createTransacitons(
      financialControlId,
      description,
      amount,
    )
    const allTransactionMonth = await repositories.findAllTransactionMonth(
      financialControlId,
    )
    const sumTotal = utils.total(allTransactionMonth)
    const sumTotalIcomes = utils.totalIcomes(allTransactionMonth)
    const sumTotalExpenses = utils.totalExpenses(allTransactionMonth)

    if (
      typeof sumTotal === 'number' &&
      financial_control_id &&
      typeof sumTotalIcomes === 'number' &&
      typeof sumTotalExpenses === 'number'
    ) {
      const financialControlId = financial_control_id.id

      await repositories.updateBalanceUser(user_id, sumTotal)
      await repositories.updateFinancialControlBalanceMoth(
        financialControlId,
        sumTotalIcomes,
        sumTotalExpenses,
      )
    }
    return newTransaction
  }
}

export async function transactionsServices() {
  return { createTransactions }
}
