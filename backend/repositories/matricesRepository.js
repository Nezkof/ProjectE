import { getDB } from "../db/connection.js";

const MATRICES_COLLECTION = "matrices";

export async function getMatrixById(userId) {
   const doc = await getDB().collection(MATRICES_COLLECTION).findOne({ userId });
   if (!doc) return null;
   return doc.matrix;
}

export async function addMatrix(userId, matrix) {
   const db = getDB();
   const collection = db.collection(MATRICES_COLLECTION);

   return await collection.updateOne({ userId }, { $set: { matrix } }, { upsert: true });
}
