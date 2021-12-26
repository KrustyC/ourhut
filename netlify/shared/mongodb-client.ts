import { MongoClient } from "mongodb";

let cachedDb = null;

export async function connect() {
  const uri = process.env.VITE_MONGO_URI;
  const client = new MongoClient(uri);

  if (cachedDb) {
    return cachedDb;
  }

  try {
    return client.connect().then((db) => {
      cachedDb = db;
      return cachedDb;
    });
  } catch (err) {
    return null;
  }
}
