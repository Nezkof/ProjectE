import { ObjectId } from "mongodb";
import { getDB } from "../db/connection.js";

export async function createUser(user) {
   return await getDB().collection("users").insertOne(user);
}

export async function findByGoogleId(googleId) {
   return await getDB().collection("users").findOne({ googleId });
}
