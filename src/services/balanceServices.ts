import { AppError } from '../AppErros/AppErros'
import { balanceRepositories } from '../models/repositories/balanceRepositories'
import { utilsGenerateCustomDate } from '../utils/utilsGenerateCustomDate'

async function getBalance(user_id: string, sub: string) {
  const respositories = await balanceRepositories()
  if (user_id !== sub) {
    throw new AppError('Unauthorized.', 401)
  }
  const name = utilsGenerateCustomDate()

  const financial_control_id = await respositories.findFinancialControlID(
    user_id,
    name,
  )
  if (financial_control_id?.id) {
    const balance = await respositories.findAllBalances(
      user_id,
      financial_control_id.id,
    )

    return balance
  }
}

export async function balanceServices() {
  return { getBalance }
}
