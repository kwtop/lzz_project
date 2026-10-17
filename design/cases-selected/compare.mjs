import sharp from 'sharp';
const paths=['D:/lzz/design-explorations/cases-2026-09-30/03-setup-and-component.png','design/cases-selected/desktop.jpg'];
const images=await Promise.all(paths.map(p=>sharp(p).resize(620).toBuffer()));
const meta=await Promise.all(images.map(b=>sharp(b).metadata()));
await sharp({create:{width:1260,height:Math.max(...meta.map(m=>m.height)),channels:3,background:'#ddd'}}).composite(images.map((input,i)=>({input,left:i*640,top:0}))).jpeg().toFile('design/cases-selected/comparison.jpg');
