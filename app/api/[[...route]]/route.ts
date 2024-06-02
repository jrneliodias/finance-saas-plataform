import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import accounts from './accounts';
import { HTTPException } from 'hono/http-exception';
export const runtime = 'edge';

const app = new Hono().basePath('/api')
app.use('*', clerkMiddleware())

const routes = app
    .route('/accounts', accounts)

app.onError((err, c) => {
    if (err instanceof HTTPException) {
        return err.getResponse()
    }

    return c.json({ error: "Internal Server Error" }, 500)
})

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes