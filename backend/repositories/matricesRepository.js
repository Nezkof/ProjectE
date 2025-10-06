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

export async function removeAlbums(ids) {
   const db = getDB();
   const collection = db.collection(MATRICES_COLLECTION);

   const matrices = await collection.find({}).toArray();

   for (const doc of matrices) {
      const oldMatrix = doc.matrix;
      const newMatrix = oldMatrix
         .filter((_, rowIndex) => !ids.includes(rowIndex))
         .map((row) => row.filter((_, colIndex) => !ids.includes(colIndex)));

      await collection.updateOne({ userId: doc.userId }, { $set: { matrix: newMatrix } });
   }
}

export async function getMatrices() {
   const db = getDB();
   const collection = db.collection(MATRICES_COLLECTION);
   const matrices = await collection
      .find({}, { projection: { userId: 1, matrix: 1, _id: 0 } })
      .toArray();
   return matrices;
}

export async function removeAll() {
   const collection = getDB().collection(MATRICES_COLLECTION);
   const result = await collection.deleteMany({});
   return result;
}
