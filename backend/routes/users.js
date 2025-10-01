import express from "express";
import * as usersController from "../controllers/usersController.js";

const router = express.Router();

router.post("/", usersController.createUser);

export default router;
