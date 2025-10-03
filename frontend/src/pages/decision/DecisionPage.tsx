import { useEffect } from "react";
import AlbumCard from "../../components/albumCard/AlbumCard";
import "./decisionPage.css";

import { useIgnoredAlbumsStore } from "../../hooks/stores/ignoredAlbumsStore";
import AlbumCardSkeleton from "../../components/albumCard/AlbumCardSkeleton";
import { useUsersStore } from "../../hooks/stores/userStore";

const DecisionPage = () => {
   const initSocketListener = useIgnoredAlbumsStore((s) => s.initSocketListener);
   const fetchMyAlbums = useIgnoredAlbumsStore((state) => state.fetchMyAlbums);
   const fetchAllAlbums = useIgnoredAlbumsStore((state) => state.fetchAllAlbums);
   const allIgnoredAlbums = useIgnoredAlbumsStore((state) => state.allIgnoredAlbums);
   const removeIgnoredAlbums = useIgnoredAlbumsStore((state) => state.removeAlbums);
   const isAuth = useUsersStore((state) => state.isAuth);

   const fetchData = async () => {
      fetchMyAlbums();
      fetchAllAlbums();
   };

   useEffect(() => {
      if (isAuth) {
         fetchData();
      }
   }, [isAuth]);

   useEffect(() => {
      if (isAuth) initSocketListener();
   }, [isAuth]);

   const handleConfirm = () => {
      removeIgnoredAlbums();
      // window.location.href = "/rating";
   };

   return (
      <section className="decision-page">
         <h1 className="decision-page__title">Which albums should be deleted?</h1>
         <button className="decision-page__confirm-btn" onClick={handleConfirm}>
            Remove albums
         </button>
         <ul className="decision-page__ranking-board">
            {!allIgnoredAlbums || allIgnoredAlbums.length > 0
               ? allIgnoredAlbums.map((album) => (
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
