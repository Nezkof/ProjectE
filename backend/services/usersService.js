import * as usersRepo from "../repositories/usersRepository.js";

async function addUser(userData) {
   if (!userData.email) {
      throw new Error("Email is required");
   }

   const existing = await usersRepo.findByGoogleId(userData.googleId);
   if (existing) {
      return existing;
   }

   return await usersRepo.createUser(userData);
}

const usersService = {
   addUser,
};

export default usersService;
