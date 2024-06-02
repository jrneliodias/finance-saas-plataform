import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import z from 'zod'

export const runtime = 'Nodejs';

const app = new Hono()
.use('*', clerkMiddleware())
.get("/", async (c)=>{
})

export default app