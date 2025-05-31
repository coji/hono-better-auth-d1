import type { BetterAuthOptions } from 'better-auth'

export const config = {
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ['http://localhost:5173'],
} satisfies Omit<BetterAuthOptions, 'database'>
