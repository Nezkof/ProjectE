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
   permutationDistance: number;
   usersData: {
      user: string;
      userDistance: number;
   }[];
}

export interface ExpertStatistics {
   name: string;
   distance: number;
   ratio: number;
   normalized: number;
   ideal: number;
}
