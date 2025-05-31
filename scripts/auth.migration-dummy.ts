import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { config } from '../src/lib/auth.config'

export const auth = betterAuth({
  ...config,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  database: drizzleAdapter(process.env.DATABASE_URL as any, {
    provider: 'sqlite',
  }),
})
