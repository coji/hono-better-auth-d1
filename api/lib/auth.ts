import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../db'
import { config } from './auth.config'
export type * from '../db/schema'

export const auth = betterAuth({
  ...config,
  database: drizzleAdapter(db, { provider: 'sqlite' }),
})

export type AuthType = typeof auth
