import { getDB } from "../db/connection.js";

const COLLECTION_NAME = "albums";

export async function setAlbums(albums) {
   const collection = getDB().collection(COLLECTION_NAME);
   await collection.deleteMany({});

   const result = await collection.insertMany(albums);
   return {
      message: "Collection cleared and albums inserted",
      insertedCount: result.insertedCount,
   };
}
export async function getAlbums() {
   return await getDB().collection(COLLECTION_NAME).find().toArray();
}

export async function getById(id) {
   const collection = getDB().collection(COLLECTION_NAME);
   return await collection.findOne({ id: id });
}

export async function removeMany(ids) {
   const collection = getDB().collection(COLLECTION_NAME);

   const result = await collection.deleteMany({
      id: { $in: ids },
   });

   return result;
}

export async function reindex() {
   const collection = getDB().collection(COLLECTION_NAME);

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
