import type { BetterAuthOptions } from 'better-auth'

export const config = {
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.CLIENT_ORIGIN ?? ''],
} satisfies Omit<BetterAuthOptions, 'database'>
