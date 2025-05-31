import type { BetterAuthOptions } from 'better-auth'

export const config = {
  emailAndPassword: {
    enabled: true,
  },
} satisfies Omit<BetterAuthOptions, 'database'>
