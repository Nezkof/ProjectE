export interface Album {
   id: number;
   title: string;
   artist: string;
   link: string;
   cover: string;
}

export interface Expert {
   id: number;
   name: string;
}

export interface User {
   name: string;
   picture: string;
}

export interface PermutationResult {
   permutation: number[];
   maxl: number;
   sum: number;
   hammingDistance: number;
   distances: {
      user: string;
      cookDistance: number;
      hammingDistance: number;
   }[];
}
