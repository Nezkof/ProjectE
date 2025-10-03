import { getDB } from "../db/connection.js";

const IGNORED_ALBUMS_COLLECTION = "ignoredAlbums";

export async function add(userId, albumId) {
   const db = getDB();
   const collection = db.collection(IGNORED_ALBUMS_COLLECTION);

   return await collection.updateOne(
      { albumId },
      { $addToSet: { selectedBy: userId } },
      { upsert: true }
   );
}

export async function remove(userId, albumId) {
   const db = getDB();
   const collection = db.collection(IGNORED_ALBUMS_COLLECTION);

   await collection.updateOne({ albumId }, { $pull: { selectedBy: userId } });
   return await collection.deleteOne({
      albumId,
      selectedBy: { $size: 0 },
   });
}

export async function findByUser(userId) {
   const db = getDB();
   const collection = db.collection(IGNORED_ALBUMS_COLLECTION);

   return await collection.find({ selectedBy: userId }).toArray();
}

export async function findAllRaw() {
   const db = getDB();
   const collection = db.collection(IGNORED_ALBUMS_COLLECTION);
   return await collection.find({}).toArray();
}

export async function getByUserId(userId) {
   const db = getDB();
   const collection = db.collection(IGNORED_ALBUMS_COLLECTION);
   const docs = await collection.find({ selectedBy: userId }).toArray();
   return docs.map((doc) => doc.albumId);
}
