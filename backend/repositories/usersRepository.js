import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

export async function getAllUsers() {
   return await getDB().collection("users").find().toArray();
}

export async function getUserById(id) {
   return await getDB()
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
}

export async function createUser(user) {
   return await getDB().collection("users").insertOne(user);
}
