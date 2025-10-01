import * as usersRepo from "../repositories/usersRepository.js";

export async function addUser(userData) {
   if (!userData.name || !userData.email) {
      throw new Error("Name and email are required");
   }
   return await usersRepo.createUser(userData);
}
