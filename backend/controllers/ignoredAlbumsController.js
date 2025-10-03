import * as ignoredAlbumsService from "./../services/ignoredAlbumsService.js";

export const add = async (req, res) => {
   try {
      const userId = req.cookies.client_id;
      const { albumId } = req.body;

      if (userId == null || albumId == null) {
         return res.status(400).json({ message: "userId (cookie) and albumId are required" });
      }

      const result = await ignoredAlbumsService.add(userId, albumId);

      const io = req.app.get("io");
      io.emit("ignoredAlbumsUpdated", { albumIds: albumId, action: "add" });

      res.status(201).json(result);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

export const remove = async (req, res) => {
   try {
      const { albumId } = req.body;
      const userId = req.cookies.client_id;

      await ignoredAlbumsService.remove(userId, albumId);

      const io = req.app.get("io");
      io.emit("ignoredAlbumsUpdated", { albumIds: albumId, action: "remove" });

      res.status(200).json({ success: true });
   } catch (err) {
      res.status(500).json({ error: "Failed to remove album" });
   }
};

export const removeMany = async (req, res) => {
   try {
      const { albumIds } = req.body;
      console.log(req.body);

      await ignoredAlbumsService.removeMany(albumIds);

      const io = req.app.get("io");
      io.emit("albumsUpdated", { albumIds, action: "removeMany" });

      res.status(200).json({ success: true });
   } catch (err) {
      res.status(500).json({ error: "Failed to remove albums" });
   }
};

export const getAll = async (req, res) => {
   try {
      const albums = await ignoredAlbumsService.getAll();
      res.json(albums);
   } catch (err) {
      console.error("getAll error:", err);
      res.status(500).json({ error: "Internal Server Error" });
   }
};

export const getByUserId = async (req, res) => {
   try {
      const userId = req.cookies.client_id;

      if (!userId) {
         return res.status(400).json({ message: "client_id cookie is required" });
      }

      const albumIds = await ignoredAlbumsService.getByUserId(userId);
      res.json(albumIds);
   } catch (err) {
      console.error("getById error:", err);
      res.status(500).json({ error: "Internal Server Error" });
   }
};
