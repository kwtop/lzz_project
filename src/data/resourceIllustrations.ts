// Generic teaching illustrations generated for Resources; not customer-part evidence.
import {refreshedImage} from './imageRefresh';
export const resourceIllustrations = {
 turning: {stem:'turning-geometry-v1',alt:'Stepped shaft with rotational features'},
 milling: {stem:'milling-geometry-v1',alt:'Generic block with a pocket, flat faces and a hole pattern'},
 multiAxis: {stem:'multi-axis-geometry-v1',alt:'Generic component with a bore on an angled face and a hole on another face'},
 finish: {stem:'finish-interfaces-v1',alt:'Aluminum block with a blue exterior face and uncoated bore and pocket interfaces'},
};
export function resourceIllustration(key:keyof typeof resourceIllustrations) {
 const {stem,alt}=resourceIllustrations[key];
 const image=refreshedImage(`/media/resources/${stem}-800.webp`);
 if(image)return `<img src="${image.src}" srcset="${image.srcset}" sizes="(max-width:767px) calc(100vw - 40px), 560px" alt="${alt}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async"/>`;
 return `<img src="/media/resources/${stem}-800.webp" srcset="${[480,800,1200].map(w=>`/media/resources/${stem}-${w}.webp ${w}w`).join(', ')}" sizes="(max-width:760px) 200px, 300px" alt="${alt}" width="1200" height="900" loading="lazy" decoding="async"/>`;
}
