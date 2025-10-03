import * as albumsService from "./../services/albumsService.js";

export const getAlbums = async (req, res) => {
   try {
      const albums = await albumsService.getAlbums();
      res.json(albums);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

export const addAlbums = async (req, res) => {
   try {
      const albums = req.body;
      const result = await albumsService.addAlbums(albums);

      res.status(201).json(result);
   } catch (err) {
      res.status(400).json({ error: err.message });
   }
};
