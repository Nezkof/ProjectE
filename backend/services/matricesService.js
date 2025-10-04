import * as matricesRepo from "../repositories/matricesRepository.js";
import * as albumsRepo from "../repositories/albumsRepository.js";
import * as usersRepo from "../repositories/usersRepository.js";

function calculateScores(matrix) {
   const n = matrix.length;

   const scores = new Array(n).fill(0);
   for (let i = 0; i < n; i++) {
      let score = 0;
      for (let j = 0; j < n; j++) {
         score += matrix[i][j];
      }
      scores[i] = score;
   }

   return scores;
}

function sortAlbums(scores, albums) {
   const indexed = scores.map((score, index) => ({
      album: albums[index],
      score,
      index,
   }));

   indexed.sort((a, b) => b.score - a.score);

   let currentRank = 1;
   for (let i = 0; i < indexed.length; i++) {
      if (i > 0 && indexed[i].score < indexed[i - 1].score) {
         currentRank = i + 1;
      }
      indexed[i].rank = currentRank;
   }

   return indexed.map(({ album }) => album);
}

export async function getMatrixById(userId) {
   return await matricesRepo.getMatrixById(userId);
}

export async function addMatrix(userId, matrix) {
   return await matricesRepo.addMatrix(userId, matrix);
}

export async function getRankedAlbums(userId) {
   const matrix = await matricesRepo.getMatrixById(userId);
   if (!matrix) return null;
   const albums = await albumsRepo.getAlbums();

   const scores = calculateScores(matrix);
   const ranks = sortAlbums(scores, albums);

   return ranks;
}

export async function getAlbumsRanks() {
   const usersMatrices = await matricesRepo.getMatrices();
   const albums = await albumsRepo.getAlbums();
   const usersRanks = [];

   for (const data of usersMatrices) {
      const scores = calculateScores(data.matrix);
      const userRanks = sortAlbums(scores, albums);
      const user = await usersRepo.findByGoogleId(data.userId);

      const ranks = [];
      userRanks.forEach((album, index) => {
         const rank = index + 1;
         ranks[album.id] = rank;
      });

      usersRanks.push({
         user: user.firstName,
         ranks: ranks,
      });
   }

   return usersRanks;
}

export async function removeAlbums(ids) {
   return await matricesRepo.removeAlbums(ids);
}
