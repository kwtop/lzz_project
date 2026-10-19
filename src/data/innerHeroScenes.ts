import {siteImage} from './siteImages';

export const immersiveInnerPaths=[
 '/machined-parts/','/factory/','/resources/','/resources/ordering/',
 '/resources/technical-guides/','/about/','/about/company-profile/','/about/how-we-work/',
] as const;

export const usesImmersiveInnerHero=(path:string)=>immersiveInnerPaths.some(route=>route===path);

export const innerHeroScene=(path:string)=>{
 if(path==='/machined-parts/')return siteImage('inner-parts-scene');
 if(path==='/factory/'||path==='/about/company-profile/')return siteImage('inner-factory-scene');
 if(path.startsWith('/resources/')||path==='/about/how-we-work/')return siteImage('inner-resources-scene');
 return siteImage('inner-about-scene');
};
