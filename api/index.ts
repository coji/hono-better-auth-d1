import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { AuthType } from './lib/auth'
import auth from './routes/auth'

type Env = {
  CLIENT_ORIGIN: string
  BETTER_AUTH_URL: string
}

const app = new Hono<{ Variables: AuthType; Bindings: Env }>({
  strict: false,
})

app.use('/api/*', async (c, next) => {
  const clientOrigin = c.env.CLIENT_ORIGIN || 'http://localhost:5173'
  const allowedOrigins = clientOrigin.split(',').map(origin => origin.trim())
  
  return cors({
    origin: allowedOrigins,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })(c, next)
})

const routes = [auth] as const
// biome-ignore lint/complexity/noForEach: <explanation>
routes.forEach((route) => {
  app.basePath('/api').route('/', route)
})

export default app
