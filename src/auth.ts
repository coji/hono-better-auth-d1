import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { config } from './auth.config'
import { db } from './db'

export const auth = betterAuth({
  ...config,
  database: drizzleAdapter(db, { provider: 'sqlite' }),
})
