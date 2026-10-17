import sharp from 'sharp';
const files=['D:/lzz/design-explorations/rfq-checklist-2026-09-30/03-drawing-led-editorial.png','design/rfq-selected/desktop.jpg'];
const images=await Promise.all(files.map(f=>sharp(f).resize(620).toBuffer()));
const meta=await Promise.all(images.map(b=>sharp(b).metadata()));
await sharp({create:{width:1260,height:Math.max(...meta.map(m=>m.height)),channels:3,background:'#ddd'}}).composite(images.map((input,i)=>({input,left:i*640,top:0}))).jpeg().toFile('design/rfq-selected/comparison.jpg');
