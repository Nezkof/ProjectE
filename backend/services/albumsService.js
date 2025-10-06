import * as albumsRepo from "../repositories/albumsRepository.js";

export async function setAlbums(albums) {
   if (!Array.isArray(albums) || albums.length === 0) {
      throw new Error("Request body must be a non-empty array of albums");
   }

   albums.forEach((album, index) => {
      if (!album.title || !album.artist) {
         throw new Error(`Album at index ${index} must have title and artist`);
      }
   });

   return await albumsRepo.setAlbums(albums);
}

export async function removeMany(ids) {
   await albumsRepo.removeMany(ids);
   return await albumsRepo.reindex();
}

export async function getAlbums() {
   return await albumsRepo.getAlbums();
}

export async function getById(id) {
   return await albumsRepo.getById(id);
}
