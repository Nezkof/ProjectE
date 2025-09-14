import { useRanking } from "../../hooks/useRanking";
import AlbumCard from "../albumCard/AlbumCard";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";

const RankingBoard = () => {
   const { rankedAlbums, updateAlbumPosition } = useRanking();

   const handleDragEnd = (result: DropResult) => {
      if (!result.destination) return;
      updateAlbumPosition(result.source.index, result.destination.index);
   };

   return (
      <DragDropContext onDragEnd={handleDragEnd}>
         <Droppable droppableId="rankingBoard">
            {(provided) => (
               <ul className="ranking-board" {...provided.droppableProps} ref={provided.innerRef}>
                  {rankedAlbums.map((album, index) => (
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
