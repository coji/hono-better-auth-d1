import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { AuthType } from './lib/auth'
import auth from './routes/auth'

const app = new Hono<{ Variables: AuthType }>({
  strict: false,
})
app.use(
  '/api/*',
  cors({
    origin: 'http://localhost:5173',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
)

const routes = [auth] as const
// biome-ignore lint/complexity/noForEach: <explanation>
routes.forEach((route) => {
  app.basePath('/api').route('/', route)
})

export default app
