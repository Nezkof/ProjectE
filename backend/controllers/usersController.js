import * as usersService from "../services/usersService.js";

export async function createUser(req, res) {
   try {
      const result = await usersService.addUser(req.body);
      res.status(201).json(result);
   } catch (err) {
      res.status(400).json({ error: err.message });
   }
}

export const getUserById = (req, res) => {
   if (!req.user) return res.status(401).json({ message: "Not authenticated" });

   const { given_name, picture } = req.user._json;
   res.json({
      name: given_name,
      picture,
   });
};
