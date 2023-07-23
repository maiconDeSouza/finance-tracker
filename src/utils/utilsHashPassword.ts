import { createHmac } from 'node:crypto'
import { env } from '../config/env'

export async function utilsHashPassword(password: string) {
  const hash = createHmac('sha256', password)
    .update(env.HASH_SECRET)
    .digest('hex')

  return hash
}
