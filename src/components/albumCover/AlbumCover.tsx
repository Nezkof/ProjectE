import "./albumCover.css";

interface Props {
   href: string;
   path: string;
   alt: string;
   className?: string;
}

const handleButton = (event: any) => {
   event.stopPropagation();
};

const AlbumCover = (props: Props) => {
   return (
      <div className={`album-cover ${props.className || ""}`}>
         <a href={props.href} className="album-cover__link" onClick={handleButton}>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
            </svg>
         </a>
         <img className="album-cover__img" src={props.path} alt={props.alt} />
      </div>
   );
};

export default AlbumCover;
