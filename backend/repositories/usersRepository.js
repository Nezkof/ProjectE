import { ObjectId } from "mongodb";
import { getDB } from "../db/connection.js";

const USERS_COLLECTION = "users";

export async function createUser(user) {
   return await getDB().collection(USERS_COLLECTION).insertOne(user);
}

export async function findByGoogleId(googleId) {
   return await getDB().collection(USERS_COLLECTION).findOne({ googleId });
}

export async function getUsers() {
   return await getDB().collection(USERS_COLLECTION).find({}).toArray();
}
