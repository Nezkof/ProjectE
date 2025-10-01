import express from "express";
import * as albumsController from "../controllers/albumsController.js";

const router = express.Router();

router.get("/", albumsController.getAlbums);
router.post("/addAlbums", albumsController.addAlbums);

export default router;
