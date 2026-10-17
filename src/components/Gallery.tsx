import {refinedSrcset} from '../data/refinedImages';
export default function Gallery({name,preview}:{name:string;preview:string}){
 return <div className="gallery">
  <div className="gallery-main">
   <a className="gallery-open static-photo">
   <img src={`/media/${preview}.webp`} srcSet={refinedSrcset(preview)} sizes="(max-width:760px) calc(100vw - 44px), 650px" alt={name} width="800" height="800"/>
   </a>
  </div>
 </div>;
}
