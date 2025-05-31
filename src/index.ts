import { Hono } from 'hono'
import type { AuthType } from './lib/auth'
import auth from './routes/auth'

const app = new Hono<{ Variables: AuthType }>({
  strict: false,
})

const routes = [auth] as const
// biome-ignore lint/complexity/noForEach: <explanation>
routes.forEach((route) => {
  app.basePath('/api').route('/', route)
})

export default app
