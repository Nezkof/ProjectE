import { ObjectId } from "mongodb";
import { getDB } from "../db/connection.js";

const COLLECTION_NAME = "albums";

export async function createAlbums(albums) {
   const db = getDB();
   const collection = db.collection(COLLECTION_NAME);

   const ids = albums.map((a) => a.id);

   const existing = await collection.find({ id: { $in: ids } }).toArray();
   const existingIds = existing.map((e) => e.id);

   const newAlbums = albums.filter((a) => !existingIds.includes(a.id));

   if (newAlbums.length === 0) {
      return { message: "No new albums to insert", insertedCount: 0 };
   }

   const result = await collection.insertMany(newAlbums);
   return { message: "Inserted albums", insertedCount: result.insertedCount };
}

export async function getAlbums() {
   return await getDB().collection(COLLECTION_NAME).find().toArray();
}
