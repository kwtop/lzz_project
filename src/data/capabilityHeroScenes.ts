import manifest from './capabilityHeroScenes.generated.json';
import type {InteriorImage} from './pentaInteriors';

type HeroScene={kind:'overview'|'process'|'material'|'planning';label:string;image:InteriorImage};

/** Generic display photography; never replaces product identities or workshop records. */
export const capabilityHeroScene=(slug:string):HeroScene=>{
 const scene=manifest[slug as keyof typeof manifest]||manifest.overview;
 return {kind:scene.kind as HeroScene['kind'],label:scene.label,image:scene.image};
};
