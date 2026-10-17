import {refinedSrcset} from '../data/refinedImages';
export default function Gallery({name,preview}:{name:string;preview:string}){
 return <div className="gallery">
  <div className="gallery-main">
   <a className="gallery-open" href={`/media/${preview}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`View full-size image: ${name} (opens in a new tab)`}>
   <img src={`/media/${preview}.webp`} srcSet={refinedSrcset(preview)} sizes="(max-width:760px) calc(100vw - 34px), 650px" alt={name} width="800" height="800"/>
   <span className="gallery-open-label">View full-size image <span aria-hidden="true">↗</span></span>
   </a>
  </div>
 </div>;
}
