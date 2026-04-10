import "dotenv/config";
import { connectDb } from "./db";

const port = Number(process.env.PORT ?? 3000);

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  if (url.pathname === "/users" && request.method === "GET") {
    const db = await connectDb();
    const users = await db.collection("users").find().toArray();
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (url.pathname === "/users" && request.method === "POST") {
    const body = await request.json().catch(() => null);
    if (!body || typeof body.name !== "string") {
      return new Response(JSON.stringify({ error: "Missing user name." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = await connectDb();
    const result = await db.collection("users").insertOne({
      name: body.name,
      email: typeof body.email === "string" ? body.email : null,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ insertedId: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}

console.log(`Starting Bun MongoDB Atlas app on http://localhost:${port}`);

serve(async (request: Request) => {
  return handleRequest(request);
}, { port });
