// ponytail: one cached client. sync getter for auth (no top-level await),
// async getter for data code. driver buffers ops until connect.
import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

export function getMongoClient(): MongoClient {
  if (!globalForMongo._mongoClient) {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not set");
    globalForMongo._mongoClient = new MongoClient(uri);
  }
  return globalForMongo._mongoClient;
}

// caveman: clean DB name. bad value -> safe fallback, no crash.
export function getDbName(): string {
  const raw = (process.env.MONGO_DB ?? "hostelfix").trim().replace(/^["']|["']$/g, "");
  if (/^[A-Za-z0-9_-]+$/.test(raw)) return raw;
  console.warn(`[mongo] bad MONGO_DB=${JSON.stringify(raw)}, using "hostelfix"`);
  return "hostelfix";
}

export async function getDb() {
  const client = getMongoClient();
  await client.connect();
  return { client, db: client.db(getDbName()) };
}

// caveman: auth import-time use only. no await, no crash build.
export function getAuthDb() {
  return getMongoClient().db(getDbName());
}

