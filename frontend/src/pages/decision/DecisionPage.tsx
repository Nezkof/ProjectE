import { useEffect, useState } from "react";
import AlbumCard from "../../components/albumCard/AlbumCard";
import "./decisionPage.css";

import type { Album } from "../../types/types";
import { useIgnoredAlbumsStore } from "../../hooks/stores/ignoredAlbumsStore";
import AlbumCardSkeleton from "../../components/albumCard/AlbumCardSkeleton";

const DecisionPage = () => {
   const [ignoredAlbums, setIgnoredAlbums] = useState<Album[]>([]);
   const fetchAlbums = useIgnoredAlbumsStore((state) => state.fetchAlbums);

   useEffect(() => {
      const loadAlbums = async () => {
         const albumsData = await fetchAlbums();
         setIgnoredAlbums(albumsData);
      };

      loadAlbums();
   }, []);

   const handleConfirm = () => {
      // window.location.href = "/rating";
   };

   return (
      <section className="decision-page">
         <h1 className="decision-page__title">Which albums should be deleted?</h1>
         <button className="decision-page__confirm-btn" onClick={handleConfirm}>
            Remove albums
         </button>
         <ul className="decision-page__ranking-board">
            {ignoredAlbums.length > 0 && ignoredAlbums.length > 0
               ? ignoredAlbums.map((album, index) => (
                    <li key={album.id}>
                       <AlbumCard
                          id={album.id}
                          isSelectable={true}
                          label={album.title}
                          author={album.artist}
                          href={album.link}
                          path={album.cover}
                          alt={album.title}
                       />
                    </li>
                 ))
               : Array.from({ length: 5 }).map((_, index) => (
                    <li key={index}>
                       <AlbumCardSkeleton />
                    </li>
                 ))}
         </ul>
      </section>
   );
};

export default DecisionPage;
