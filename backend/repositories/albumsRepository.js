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

export async function getById(id) {
   const db = getDB();
   const collection = db.collection(COLLECTION_NAME);

   return await collection.findOne({ id: id });
}

export async function removeMany(ids) {
   const db = getDB();
   const collection = db.collection(COLLECTION_NAME);

   const result = await collection.deleteMany({
      id: { $in: ids },
   });

   return result;
}

export async function reindex() {
   const db = getDB();
   const collection = db.collection(COLLECTION_NAME);

   const albums = await collection.find({}).sort({ id: 1 }).toArray();

   const updatedAlbums = albums.map((album, index) => ({
      ...album,
      oldId: album.id,
      id: index,
   }));

   for (const album of updatedAlbums) {
      await collection.updateOne({ _id: album._id }, { $set: { id: album.id } });
   }

   return updatedAlbums;
}
