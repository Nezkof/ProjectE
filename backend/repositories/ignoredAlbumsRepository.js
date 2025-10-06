import { getDB } from "../db/connection.js";

const COLLECTION_NAME = "ignoredAlbums";

export async function add(userId, albumId) {
   const db = getDB();
   const collection = db.collection(COLLECTION_NAME);

   return await collection.updateOne(
      { albumId },
      { $addToSet: { selectedBy: userId } },
      { upsert: true }
   );
}

export async function remove(userId, albumId) {
   const db = getDB();
   const collection = db.collection(COLLECTION_NAME);

   await collection.updateOne({ albumId }, { $pull: { selectedBy: userId } });
   return await collection.deleteOne({
      albumId,
      selectedBy: { $size: 0 },
   });
}

export async function removeMany(albumIds) {
   const db = getDB();
   const collection = db.collection(COLLECTION_NAME);

   const result = await collection.deleteMany({
      albumId: { $in: albumIds },
   });

   return result;
}

export async function findByUser(userId) {
   const db = getDB();
   const collection = db.collection(COLLECTION_NAME);

   return await collection.find({ selectedBy: userId }).toArray();
}

export async function findAllRaw() {
   const db = getDB();
   const collection = db.collection(COLLECTION_NAME);
   return await collection.find({}).toArray();
}

export async function getByUserId(userId) {
   const db = getDB();
   const collection = db.collection(COLLECTION_NAME);
   const docs = await collection.find({ selectedBy: userId }).toArray();
   return docs.map((doc) => doc.albumId);
}

export async function removeAll() {
   const collection = getDB().collection(COLLECTION_NAME);
   const result = await collection.deleteMany({});
   return result;
}
