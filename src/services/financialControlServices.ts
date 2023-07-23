import { AppError } from '../AppErros/AppErros'
import { financialControlRepositories } from '../models/repositories/financialControlRepositories'
import { utilsGenerateCustomDate } from '../utils/utilsGenerateCustomDate'

async function getOrCreateTransactionsOfMonth(id: string, sub: string) {
  if (id !== sub) {
    throw new AppError('Unauthorized.', 401)
  }
  const name = utilsGenerateCustomDate()

  const repositories = await financialControlRepositories()
  const financialControlUser = await repositories.findFinancialControlByName(
    name,
    id,
  )

  if (financialControlUser[0]) {
    return financialControlUser
  } else {
    const newFinancialControl = await repositories.createFinancialControl(
      name,
      id,
    )
    return newFinancialControl
  }
}

export async function financialControlServices() {
  return { getOrCreateTransactionsOfMonth }
}
