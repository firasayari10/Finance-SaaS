import {Hono} from "hono";
import { handle } from "hono/vercel";
import {db} from "@/db/drizzle"
import {HTTPException } from "hono/http-exception"
import {accounts, inserAccountSchema } from "@/db/schema" ;
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm" ; 
import {createId} from "@paralleldrive/cuid2"

import { zValidator } from "@hono/zod-validator";

const app = new Hono()
    .get("/" ,clerkMiddleware(), async (c) => {
        const auth = getAuth(c);
        if(!auth?.userId)
        {
            throw new HTTPException(401,{
                    res:c.json( {error : "unauthroized "},401)
            })
            
        }
        const data = await db 
        .select({
            id: accounts.id,
            name:  accounts.name,

        })
        .from(accounts)
        .where(eq(accounts.userId,auth.userId));
        return c.json({data})

    })
    .post("/",clerkMiddleware(),zValidator("json",inserAccountSchema.pick({name: true ,})), async (c) => {
        const auth = getAuth(c);
        const values = c.req.valid("json");
        if(!auth?.userId) 
        {
                return c.json({error : "unauthorized"},401);
        }
        const data = await db.insert(accounts).values({
            id: createId() ,
            userId: auth.userId,
            name: values.name,
            ...values
        }).returning();


        return c.json({ data });

    })

export default app;