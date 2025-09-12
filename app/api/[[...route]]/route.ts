

import { Hono } from 'hono'
import { handle } from "hono/vercel"


import categories from './categories';
import accounts from "./accounts"
import transactions from "./transactions"
import summary from "./summary"
import { HTTPException } from 'hono/http-exception';





const app = new Hono().basePath('/api');
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "internal server error " }, 500);
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app 
    .route("/accounts",accounts)
    .route("/categories",categories)
    .route("/transactions",transactions)
    .route("/summary",summary);


export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);


export type AppType = typeof routes ; 
