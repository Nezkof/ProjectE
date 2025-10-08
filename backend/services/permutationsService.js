export function* generatePermutations(N) {
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
