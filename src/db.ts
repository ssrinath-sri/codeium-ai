import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? "bun_app";

if (!uri) {
  throw new Error("MONGODB_URI is required in the environment.");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectDb() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}

export function getDb() {
  if (!client.topology || !client.topology.isConnected()) {
    throw new Error("MongoDB client is not connected. Call connectDb() first.");
  }
  return client.db(dbName);
}
