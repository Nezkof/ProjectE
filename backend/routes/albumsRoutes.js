import express from "express";
import * as albumsController from "../controllers/albumsController.js";

const router = express.Router();

router.get("/", albumsController.getAlbums);
router.post("/setAlbums", albumsController.setAlbums);

export default router;
