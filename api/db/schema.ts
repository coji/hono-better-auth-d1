import type * as auth from './schema-auth'
export * from './schema-auth'

export type User = typeof auth.user.$inferSelect | null
export type Session = typeof auth.session.$inferSelect | null

export type AuthType = {
  user: User
  session: Session
}
