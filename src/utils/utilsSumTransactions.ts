interface IutilsSumTransactions {
  id: string
  description: string
  amount: number
  created_at: Date
  financial_control_id: string
}
function total(transactions: IutilsSumTransactions[] | unknown) {
  if (Array.isArray(transactions)) {
    const sumTotal = transactions
      .map((transaction) => Number(transaction.amount))
      .reduce((acc, value) => {
        return (acc += value)
      })
    return sumTotal
  }
  return null
}

function totalIcomes(transactions: IutilsSumTransactions[] | unknown) {
  if (Array.isArray(transactions)) {
    const sumTotalIcomes = transactions
      .map((transaction) => Number(transaction.amount))
      .filter((amount) => amount >= 0)
      .reduce((acc, value) => {
        return (acc += value)
      })
    return sumTotalIcomes
  }
  return null
}

function totalExpenses(transactions: IutilsSumTransactions[] | unknown) {
  if (Array.isArray(transactions)) {
    const sumTotalExpenses = transactions
      .map((transaction) => Number(transaction.amount))
      .filter((amount) => amount < 0)
      .reduce((acc, value) => {
        return (acc += value)
      })
    return sumTotalExpenses
  }
  return null
}

export function utilSumTransactions() {
  return {
    total,
    totalIcomes,
    totalExpenses,
  }
}
