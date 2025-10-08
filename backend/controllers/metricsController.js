import * as metricsService from "../services/metricsService.js";

export async function getCookDistance(req, res) {
   try {
      const result = await metricsService.getCookDistance();
      res.status(201).json(result);
   } catch (err) {
      res.status(400).json({ error: err.message });
   }
}
