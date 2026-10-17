import {refinedSrcset} from '../data/refinedImages';
export default function Gallery({name,preview}:{name:string;preview:string}){
 return <div className="gallery">
  <div className="gallery-main">
   <img src={`/media/${preview}.webp`} srcSet={refinedSrcset(preview)} sizes="(max-width:760px) 90vw, 650px" alt={name} width="800" height="800"/>
  </div>
 </div>;
}
