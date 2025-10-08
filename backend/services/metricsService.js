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

function ranksToComparisonMatrix(ranks) {
   const n = ranks.length;
   const matrix = Array.from({ length: n }, () => Array(n).fill(0));

   for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
         if (ranks[i] < ranks[j]) {
            matrix[i][j] = 1;
            matrix[j][i] = -1;
         } else if (ranks[i] > ranks[j]) {
            matrix[i][j] = -1;
            matrix[j][i] = 1;
         }
      }
   }

   return matrix;
}

export async function getCookDistance() {
   const usersRanks = await matricesService.getAlbumsRanks();
   const albumsNumber = usersRanks[0].ranks.length;

   let minL = Infinity;
   let minMaxl = Infinity;
   let minH = Infinity;
   let minMaxH = Infinity;

   let additiveCookResults = [];
   let minmaxCookResults = [];
   let additiveHammingResults = [];
   let minmaxHammingResults = [];

   for (const permutation of generatePermutations(albumsNumber)) {
      let L = 0; // sumCook
      let H = 0; // sumHamming
      let maxl = -Infinity; // maxCook
      let maxh = -Infinity; // maxHamming
      let distances = [];

      const permMatrix = ranksToComparisonMatrix(permutation);

      for (const expert of usersRanks) {
         let l = 0;
         for (let i = 0; i < albumsNumber; i++) {
            l += Math.abs(permutation[i] - expert.ranks[i]);
         }

         const expertMatrix = ranksToComparisonMatrix(expert.ranks);
         const diffs = getHammingDistance(permMatrix, expertMatrix);
         const hammingDistance = diffs.reduce((a, b) => a + b, 0);

         maxl = Math.max(maxl, l);
         maxh = Math.max(maxh, hammingDistance);

         L += l;
         H += hammingDistance;

         distances.push({
            user: expert.user,
            cookDistance: l,
            hammingDistance: hammingDistance,
         });
      }

      const baseResult = {
         permutation: [...permutation],
      };

      const MAX_RESULTS = 5;

      const updateResults = (currentValue, minValue, resultsArray, resultDataCreator) => {
         if (currentValue < minValue) {
            resultsArray.length = 0;
            resultsArray.push(resultDataCreator());
            return currentValue;
         } else if (currentValue === minValue && resultsArray.length < MAX_RESULTS) {
            resultsArray.push(resultDataCreator());
         }
         return minValue;
      };

      minL = updateResults(L, minL, additiveCookResults, () => ({
         ...baseResult,
         permutationDistance: L,
         usersData: distances.map((d) => ({
            user: d.user,
            userDistance: d.cookDistance,
         })),
      }));

      minMaxl = updateResults(maxl, minMaxl, minmaxCookResults, () => ({
         ...baseResult,
         permutationDistance: maxl,
         usersData: distances.map((d) => ({
            user: d.user,
            userDistance: d.cookDistance,
         })),
      }));

      minH = updateResults(H, minH, additiveHammingResults, () => ({
         ...baseResult,
         permutationDistance: H,
         usersData: distances.map((d) => ({
            user: d.user,
            userDistance: d.hammingDistance,
         })),
      }));

      minMaxH = updateResults(maxh, minMaxH, minmaxHammingResults, () => ({
         ...baseResult,
         permutationDistance: maxh,
         usersData: distances.map((d) => ({
            user: d.user,
            userDistance: d.hammingDistance,
         })),
      }));
   }

   return {
      additiveCookResults,
      minmaxCookResults,
      additiveHammingResults,
      minmaxHammingResults,
   };
}

export function getHammingDistance(matrix1, matrix2) {
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

   return diffs;
}
