import sharp from 'sharp';
import fs from 'node:fs';
const base='design/capabilities-selected/';
const files=fs.readdirSync(base).filter(f=>f.endsWith('-mobile.jpg'));
const thumbs=await Promise.all(files.map(async(f,i)=>{const m=await sharp(base+f).metadata();return {input:await sharp(base+f).extract({left:0,top:0,width:m.width,height:Math.min(m.height,844)}).resize(234).toBuffer(),left:i%5*244,top:Math.floor(i/5)*540};}));
await sharp({create:{width:1220,height:1080,channels:3,background:'#ddd'}}).composite(thumbs).jpeg().toFile(base+'mobile-overview.jpg');
