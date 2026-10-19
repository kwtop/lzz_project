import manifest from './siteImages.generated.json';
import {imageDescription} from '../lib/imagePresentation';

export type SiteImageId=keyof typeof manifest;

/** Generic editorial illustrations only. Documentary records stay in evidence.ts. */
export const siteImage=(id:SiteImageId)=>({...manifest[id],alt:imageDescription(manifest[id].alt)});
