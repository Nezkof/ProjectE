import express from "express";
import * as ignoredAlbumsController from "../controllers/ignoredAlbumsController.js";

const router = express.Router();

router.post("/add", ignoredAlbumsController.add);
router.post("/remove", ignoredAlbumsController.remove);
router.get("/all", ignoredAlbumsController.getAll);
router.get("/isIgnoredByUser", ignoredAlbumsController.isIgnoredByUser);

export default router;
