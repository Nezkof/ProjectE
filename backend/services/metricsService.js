import * as matricesService from "./matricesService.js";

function* generatePermutations(N) {
   const arr = Array.from({ length: N }, (_, i) => i + 1);
   yield [...arr];
   while (nextPermutation(arr)) {
      yield [...arr];
   }
}

function nextPermutation(arr) {
   let i = arr.length - 2;
   while (i >= 0 && arr[i] >= arr[i + 1]) i--;
   if (i < 0) return false;

   let j = arr.length - 1;
   while (arr[j] <= arr[i]) j--;

   [arr[i], arr[j]] = [arr[j], arr[i]];

   let left = i + 1,
      right = arr.length - 1;
   while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
   }

   return true;
}

export async function getCookDistance() {
   const usersRanks = await matricesService.getAlbumsRanks();
   const albumsNumber = usersRanks[0].ranks.length;
   console.log(usersRanks);

   let minL = Infinity;
   let additiveRankingIndex = [];

   let maxl = -Infinity;
   let minMaxl = Infinity;
   let minmaxRankingIndex = [];

   let permutationResults = [];

   let index = 0;

   for (const permutation of generatePermutations(albumsNumber)) {
      let L = 0;
      let maxl = -Infinity;
      let distances = [];

      for (const expert of usersRanks) {
         let l = 0;
         for (let i = 0; i < albumsNumber; i++) {
            l += Math.abs(permutation[i] - expert.ranks[i]);
         }
         maxl = Math.max(maxl, l);
         L += l;

         distances.push({
            user: expert.user,
            distance: l,
         });
      }

      if (L < minL) {
         minL = L;
         additiveRankingIndex = index;
      }

      if (maxl < minMaxl) {
         minMaxl = maxl;
         minmaxRankingIndex = index;
      }

      permutationResults.push({
         permutation: [...permutation],
         distances: distances,
         sum: L,
         maxl: maxl,
      });

      index += 1;
   }

   return {
      permutationResults,
      additiveRankingIndex,
      minmaxRankingIndex,
   };
}

export async function getHammingDistance(id1, id2) {
   const matrix1 = await matricesService.getMatrixById(id1);
   const matrix2 = await matricesService.getMatrixById(id2);
   const n = matrix1.length;

   const diffs = [];
   const vector1 = [];
   const vector2 = [];

   for (let i = 0; i < n - 1; ++i) {
      for (let j = i + 1; j < n; ++j) {
         vector1.push(matrix1[i][j]);
         vector2.push(matrix2[i][j]);
         const diff = Math.abs(matrix1[i][j] - matrix2[i][j]);
         diffs.push(diff);
      }
   }

   return {
      vector1,
      vector2,
      diffs,
   };
}
