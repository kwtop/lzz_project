import small from '../assets/factory/workshop-mobile-400.webp';
import medium from '../assets/factory/workshop-mobile-640.webp';
import large from '../assets/factory/workshop-mobile-887.webp';

// All variants are crops of the same documentary photograph as the desktop.
export const factoryHeroMobile={
 src:large.src,
 srcset:[small,medium,large].map(image=>`${image.src} ${image.width}w`).join(', '),
 width:large.width,
 height:large.height,
};
