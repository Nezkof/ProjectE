import * as metricsService from "../services/metricsService.js";

export async function getCookDistance(req, res) {
   try {
      const result = await metricsService.getCookDistance();
      res.status(201).json(result);
   } catch (err) {
      res.status(400).json({ error: err.message });
   }
}

export async function getHammingDistance(req, res) {
   try {
      const { id1, id2 } = req.body;
      if (!id1 || !id2) {
         return res.status(400).json({ error: "id1 and id2 are required" });
      }

      const result = await metricsService.getHammingDistance(id1, id2);
      res.status(200).json(result);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
   }
}
