import { MongoClient } from "mongodb";

// ponytail: module singleton, one client per serverless lifecycle
const globalForMongo = globalThis as unknown as { _mongoClient?: Promise<MongoClient> };

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not set");
  if (!globalForMongo._mongoClient) {
    const client = new MongoClient(uri);
    globalForMongo._mongoClient = client.connect();
  }
  return globalForMongo._mongoClient;
}

export async function getDb() {
  const client = await getClientPromise();
  return { client, db: client.db(process.env.MONGO_DB ?? "hostelfix") };
}
