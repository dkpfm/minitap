import { resolve } from 'path'
import { bgCyan, black } from 'kolorist'

export const PORT = parseInt(process.env.PORT || '') || 3309
export const r = (...args: string[]) => resolve(__dirname, '..', ...args)
export const IS_DEV = process.env.NODE_ENV !== 'production'

export function logger(name: string, message: string) {
  // eslint-disable-next-line no-console
  console.log(black(bgCyan(` ${name} `)), message)
}
