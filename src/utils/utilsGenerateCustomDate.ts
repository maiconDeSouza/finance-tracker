const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export function utilsGenerateCustomDate(): string {
  const date = new Date()

  const dataName = `${months[date.getMonth()]}/${date.getFullYear()}`

  return dataName
}
