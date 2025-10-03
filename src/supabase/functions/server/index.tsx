import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-68e7fa3d/health", (c) => {
  return c.json({ status: "ok" });
});

// Example endpoint showing kv store usage
app.get("/make-server-68e7fa3d/example", async (c) => {
  try {
    const result = await kv.get("example_key");
    return c.json({ data: result });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
