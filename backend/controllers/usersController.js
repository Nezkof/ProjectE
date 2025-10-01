import * as usersService from "../services/usersService.js";

export async function createUser(req, res) {
   try {
      const result = await usersService.addUser(req.body);
      res.status(201).json(result);
   } catch (err) {
      res.status(400).json({ error: err.message });
   }
}
