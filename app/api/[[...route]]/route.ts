import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

import {object, z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from 'hono'
import { handle } from "hono/vercel"
import { error } from 'console';


import accounts from "./accounts"
import { HTTPException } from 'hono/http-exception';


//export const runtime="edge";

const app = new Hono().basePath('/api');
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "internal server error " }, 500);
});
const routes = app 
    .route("/accounts",accounts);



/*
app.get('/hello',clerkMiddleware() ,(c) => {
    const auth=getAuth(c);
    if(!auth?.userId){
        return c.json({error : "unauthenticated entry "});
    } 
    return c.json({message: "hello next.js" ,
        userId: auth.userId}
    );  
})  


app.get("/hello/:test", zValidator("param",z.object({
    test: z.string(),
})) ,(c) => {
    const {test} = c.req.valid("param");
    return c.json({message: "hello worlld ",
        test: test,
    })
})
app.post('/',zValidator("json",z.object({
    name: z.string().min(2).max(100),
    userId: z.number(),
    
})),
zValidator("param",z.object({
    postId: z.number,
})) ,(c) => {
    const {name,userId} = c.req.valid("json");
    const {postId} = c.req.valid("param");
    return c.json({message: "User created",
        user: {name,userId}
    })
})*/

export const GET = handle(app);
export const POST = handle(app);


export type AppType = typeof routes ; 
