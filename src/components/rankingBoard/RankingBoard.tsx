import type { Album } from "../../types/types";
import AlbumCard from "../albumCard/AlbumCard";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { useState } from "react";

interface Props {
   albums: Album[];
}

const RankingBoard = (props: Props) => {
   const [albums, setAlbums] = useState(props.albums);

   const handleDragEnd = (result: DropResult) => {
      if (!result.destination) return;

      const updatedAlbums = Array.from(albums);
      const [movedAlbum] = updatedAlbums.splice(result.source.index, 1);
      updatedAlbums.splice(result.destination.index, 0, movedAlbum);

      setAlbums(updatedAlbums);

      console.log(updatedAlbums);
   };

   return (
      <DragDropContext onDragEnd={handleDragEnd}>
         <Droppable droppableId="rankingBoard">
            {(provided) => (
               <ul className="ranking-board" {...provided.droppableProps} ref={provided.innerRef}>
                  {albums.map((album, index) => (
                     <Draggable key={album.id} draggableId={album.id.toString()} index={index}>
                        {(provided) => (
                           <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                           >
                              <AlbumCard
                                 id={album.id}
                                 rank={index + 1}
                                 isDragable={true}
                                 label={album.title}
                                 author={album.artist}
                                 href={album.link}
                                 path={album.cover}
                                 alt={album.title}
                              />
                           </li>
                        )}
                     </Draggable>
                  ))}
                  {provided.placeholder}
               </ul>
            )}
         </Droppable>
      </DragDropContext>
   );
};

export default RankingBoard;
