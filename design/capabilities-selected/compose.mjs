import sharp from 'sharp';
const base='design/capabilities-selected/';
const reference='D:/lzz/design-explorations/cnc-milling-2026-09-30/round-3-full-page/01-capability-first.png';
const files=[reference,base+'milling-desktop.jpg'];
const full=await Promise.all(files.map(async f=>sharp(f).resize(620).toBuffer()));
const fm=await Promise.all(full.map(f=>sharp(f).metadata()));
await sharp({create:{width:1260,height:Math.max(...fm.map(m=>m.height)),channels:3,background:'#ddd'}}).composite(full.map((input,i)=>({input,left:i*640,top:0}))).jpeg().toFile(base+'comparison-full.jpg');
const focus=await Promise.all(files.map(async f=>{const m=await sharp(f).metadata();return sharp(f).extract({left:0,top:0,width:m.width,height:Math.round(m.width*.46)}).resize(800).toBuffer();}));
await sharp({create:{width:1620,height:370,channels:3,background:'#ddd'}}).composite(focus.map((input,i)=>({input,left:i*820,top:0}))).jpeg().toFile(base+'comparison-hero.jpg');
