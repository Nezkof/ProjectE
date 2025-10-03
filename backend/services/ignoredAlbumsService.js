import * as ignoredAlbumsRepo from "../repositories/ignoredAlbumsRepository.js";
import * as albumsService from "../services/albumsService.js";
import * as matricesService from "../services/matricesService.js";

export async function add(userId, albumId) {
   return await ignoredAlbumsRepo.add(userId, albumId);
}

export async function remove(userId, albumId) {
   return await ignoredAlbumsRepo.remove(userId, albumId);
}

export async function removeMany(albumIds) {
   await albumsService.removeMany(albumIds);
   await matricesService.removeAlbums(albumIds);
   return await ignoredAlbumsRepo.removeMany(albumIds);
}

export async function getAll() {
   const ignored = await ignoredAlbumsRepo.findAllRaw();

   const results = await Promise.all(
      ignored.map(async (doc) => {
         const albums = await albumsService.getById(doc.albumId);
         return albums;
      })
   );

   return results;
}

export async function getByUserId(userId, albumId) {
   return await ignoredAlbumsRepo.getByUserId(userId);
}
