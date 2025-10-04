import express from "express";
import * as metricsController from "../controllers/metricsController.js";

const router = express.Router();

router.get("/cook", metricsController.getCookDistance);

export default router;
