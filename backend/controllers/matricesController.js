import * as matricesService from "./../services/matricesService.js";

export const getMatrixById = async (req, res) => {
   try {
      const userId = req.params.id;
      const matrix = await matricesService.getMatrixById(userId);

      if (!matrix) {
         return res.status(404).json({ message: "Matrix not found" });
      }

      res.json(matrix);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

export const addMatrix = async (req, res) => {
   try {
      const { matrix } = req.body;

      const userId = req.cookies.client_id;

      if (!userId || !matrix) {
         return res.status(400).json({ message: "userId (from cookie) and matrix are required" });
      }

      const result = await matricesService.addMatrix(userId, matrix);
      res.status(201).json(result);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

export const getRankedAlbums = async (req, res) => {
   try {
      const userId = req.cookies.client_id;

      const ranks = await matricesService.getRankedAlbums(userId);

      if (!ranks) {
         return res.status(404).json({ message: "Matrix not found" });
      }

      res.json(ranks);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};
