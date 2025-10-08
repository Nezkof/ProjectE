import express from "express";
import * as metricsController from "../controllers/metricsController.js";

const router = express.Router();

router.get("/cook", metricsController.getCookDistance);
router.post("/getExpertsStatistics", metricsController.getExpertsStatistics);

export default router;
