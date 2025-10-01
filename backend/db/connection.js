import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";

const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   },
});

let db;

export async function connectDB() {
   try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("MongoDB Connected");
      db = client.db("users");
   } catch (err) {
      console.error("B connection error:", err);
      process.exit(1);
   }
}

export function getDB() {
   if (!db) throw new Error("DB not initialized!");
   return db;
}
