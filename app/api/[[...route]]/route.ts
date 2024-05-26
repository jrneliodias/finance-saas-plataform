import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import z from 'zod'

export const runtime = 'edge';

const app = new Hono().basePath('/api')
app.use('*', clerkMiddleware())

app
.get(
    '/hello/:test',
    clerkMiddleware(),
     zValidator("param", z.object({test: z.string()})),
     (c) => {
        const auth = getAuth(c)

        if (!auth?.userId) {
          return c.json({
            message: 'You are not logged in.'
          })
        }
        const {test} = c.req.valid('param')

  return c.json({
    message: `Hello ${test}`,
  })
})

export const GET = handle(app)
export const POST = handle(app)