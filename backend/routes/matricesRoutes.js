import express from "express";
import * as matricesController from "../controllers/matricesController.js";

const router = express.Router();

router.get("/id", matricesController.getMatrixById);
router.post("/addMatrix", matricesController.addMatrix);
router.get("/getRankedAlbums", matricesController.getRankedAlbums);
router.delete("/removeAll", matricesController.removeAll);

export default router;
