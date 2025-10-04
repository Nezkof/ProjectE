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
   let additiveRanking = [];

   let maxl = -Infinity;
   let minMaxl = Infinity;
   let minmaxRanking = [];

   let permutationResults = [];

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
         additiveRanking = [...permutation];
      }

      if (maxl < minMaxl) {
         minMaxl = maxl;
         minmaxRanking = [...permutation];
      }

      permutationResults.push({
         permutation: [...permutation],
         distances: distances,
         sum: L,
         maxl: maxl,
      });
   }

   return {
      permutationResults,
      additiveRanking,
      minL,
      additiveRanking,
      minMaxl,
   };
}
