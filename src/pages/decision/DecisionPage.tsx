import AlbumCard from "../../components/albumCard/AlbumCard";
import { useAlbumsStore } from "../../hooks/stores/albumStore";
import { useMatrixStore } from "../../hooks/stores/matrixStore";
import { useUnnecessaryAlbumsStore } from "../../hooks/stores/unnecessaryAlbumsStore";
import "./decisionPage.css";

const DecisionPage = () => {
   const unnecessaryAlbums = useUnnecessaryAlbumsStore((state) => state.unnecessaryAlbums);
   const albums = useAlbumsStore((state) => state.albums);
   const removeRows = useMatrixStore((state) => state.removeRows);
   const removeAlbum = useAlbumsStore((state) => state.removeAlbum);
   const reduceIds = useAlbumsStore((state) => state.reduceIds);
   const clearMatrices = useMatrixStore((state) => state.clearMatrices); 
   const clearUnnecessaryAlbums = useUnnecessaryAlbumsStore(
      (state) => state.clearUnnecessaryAlbums
   );

   const filteredAlbums = albums.filter((album) => unnecessaryAlbums.has(album.id));

   const handleConfirm = () => {
      const albumIdsToRemove = Array.from(unnecessaryAlbums.keys());
      removeRows(albumIdsToRemove);
      albumIdsToRemove.forEach((id) => removeAlbum(id));

      clearUnnecessaryAlbums();
      reduceIds();
      clearMatrices();

      window.location.href = "/rating";
   };

   return (
      <section className="decision-page">
         <h1 className="decision-page__title">Which albums should be deleted?</h1>
         <button className="decision-page__confirm-btn" onClick={handleConfirm}>
            Remove albums
         </button>
         <ul className="decision-page__ranking-board">
            {filteredAlbums.map((album, index) => (
               <li key={album.id}>
                  <AlbumCard
                     id={album.id}
                     rank={index + 1}
                     isSelectable={true}
                     label={album.title}
                     author={album.artist}
                     href={album.link}
                     path={album.cover}
                     alt={album.title}
                  />
               </li>
            ))}
         </ul>
      </section>
   );
};

export default DecisionPage;
