import * as albumsRepo from "../repositories/albumsRepository.js";

async function addAlbums(albums) {
   if (!Array.isArray(albums) || albums.length === 0) {
      throw new Error("Request body must be a non-empty array of albums");
   }

   albums.forEach((album, index) => {
      if (!album.title || !album.artist) {
         throw new Error(`Album at index ${index} must have title and artist`);
      }
   });

   return await albumsRepo.createAlbums(albums);
}

async function getAlbums() {
   return await albumsRepo.getAlbums();
}
const albumsService = {
   addAlbums,
   getAlbums,
};

export default albumsService;
