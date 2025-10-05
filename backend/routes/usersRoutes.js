import express from "express";
import * as usersController from "../controllers/usersController.js";

const router = express.Router();

router.post("/addUser", usersController.createUser);
router.get("/me", usersController.getUserById);
router.get("/all", usersController.getAllUsers);

export default router;
