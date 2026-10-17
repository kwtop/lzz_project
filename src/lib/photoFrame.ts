import sharp from 'sharp';

const dimensions = new Map<string, Promise<{width:number;height:number}>>();

export async function photoFrame(src:string, width:number, height:number) {
 if (!dimensions.has(src)) {
  const metadata = src.startsWith('/media/')
   ? sharp('public'+src).metadata()
   : Promise.resolve({width,height});
  dimensions.set(src,metadata.then(image=>({width:image.width||width,height:image.height||height})));
 }
 const image = await dimensions.get(src)!;
 return {
  width:image.width,
  height:image.height,
  style:`--photo-aspect:${image.width}/${image.height};--photo-ratio:${image.width/image.height}`,
 };
}
