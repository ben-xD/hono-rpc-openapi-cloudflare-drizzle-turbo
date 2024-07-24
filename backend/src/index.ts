import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { userRouter } from "./routers/user.js";
import { apiReference as scalarUI } from "@scalar/hono-api-reference";

// const {dbPool, db} = await connectToDb();

export interface AppContext {
  // So you can set c.set("db") amd c.get("db") with typesafety
  Variables: {
    // db :typeof db
  };
  // For Cloudflare bindings (e.g. KV, Durable objects, R2, etc.)
  Bindings: {
    // USERNAME: string
    // PASSWORD: string
  };
}

const appName = "Hono RPC + OpenAPI + Cloudflare + Example";
const appVersion = "0.0.1";
const openapiPath = "/openapi.json";
const app = new OpenAPIHono<AppContext>()
.doc31(openapiPath, {
  openapi: "3.1.0",
  info: {
    version: appVersion,
    title: appName,
  },
})
// Register more routes here.
.route("/users", userRouter)
.get("/", (c) => {
  return c.text("Hello Hono!");
})
.get("/docs", swaggerUI({ url: openapiPath }))
.get(
  "/scalar",
  scalarUI({
    spec: {
      url: openapiPath,
    },
  }),
);

export default app;

export type AppType = typeof app
