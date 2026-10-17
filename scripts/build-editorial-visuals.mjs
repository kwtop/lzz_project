import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const root=path.resolve(import.meta.dirname,'..');
const sourceRoot='D:/lzz/原始资料';
const entries=[
 {id:'machined-housings-editorial-v1',source:'力智造-素材资料照片/力智造-素材资料照片/阿里巴巴产品资料/产品/4/封面.jpg',mode:'source-guided edit',label:'AI-retouched presentation based on an LZZ source marketing photograph; not a specific project record.',prompt:'Preserve the three machined aluminum component shapes from the source cover; remove all promotional text and banners; arrange on a neutral gray studio surface with realistic metal texture, no logos or claims.'},
 {id:'laboratory-application-illustration-v1',mode:'generated illustration',label:'AI illustration of a possible laboratory-instrument application; not a customer project.',prompt:'Photorealistic generic unbranded laboratory instrument assembly featuring a CNC-machined aluminum housing and mounting block, neutral workbench, no text, logos, customer or performance claims.'},
 {id:'hydraulic-application-illustration-v1',mode:'generated illustration',label:'AI illustration of a possible hydraulic-equipment application; not a customer project.',prompt:'Photorealistic generic unbranded hydraulic equipment assembly featuring a CNC-machined valve manifold and realistic fittings, no text, logos, customer or performance claims.'},
 {id:'prototype-batch-comparison-illustrative-v1',mode:'generated illustration',label:'AI-generated generic visual comparison of one prototype and a repeat batch; not an LZZ order or production record.',prompt:'Photorealistic, generic CNC-machined aluminum housings: one individual prototype on the left and six matching pieces on the right, arranged on a clean neutral industrial workbench, natural factory light, no logos, labels, customer cues, quantities claimed as actual output, or text.'},
 {id:'material-family-editorial-illustrative-v1',mode:'generated illustration',label:'AI-generated generic visual of distinct machined component forms; not material identification, stock evidence or a material certificate.',prompt:'Photorealistic editorial still life of four distinct generic CNC-machined component forms in different metallic and polymer-like appearances on a neutral surface, realistic machining marks, no labels, text, logos, grade claims or technical annotations.'},
 {id:'surface-finish-coupons-illustrative-v1',mode:'generated illustration',label:'AI-generated generic finish comparison; not an LZZ finish sample, process record or specification.',prompt:'Photorealistic arrangement of four small machined metal finish coupons with visibly varied neutral surface appearance and texture, clean industrial studio lighting, no labels, coating claims, logos or text.'},
 {id:'cmm-operator-illustrative-v1',mode:'generated illustration',label:'AI-generated illustrative CMM inspection scene; not an LZZ employee, measurement or calibration record.',prompt:'Photorealistic East Asian quality technician operating a coordinate measuring machine on a machined metal component inside a clean small precision-machining inspection room, candid documentary photography, believable shop details, no visible measurement values, company marks, text or claimed results.'},
 {id:'robotics-application-illustrative-v1',mode:'generated illustration',label:'AI-generated generic robotics application scene; not a specific LZZ customer project or qualified end-use example.',prompt:'Photorealistic industrial robotics wrist assembly with generic machined metal brackets and link components in a clean automation workshop, documentary product photography, no brand marks, text, customer identity, or performance claims.'},
 {id:'hydraulic-manifold-illustrative-v1',mode:'generated illustration',label:'AI-generated generic hydraulic manifold application scene; not a specific LZZ customer project or pressure-test evidence.',prompt:'Photorealistic close editorial image of a generic precision-machined aluminum hydraulic manifold block with fittings on a clean industrial bench, realistic metal surfaces, no brand marks, pressure labels, text, customer identity or performance claims.'},
];
const sha=async file=>crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
await fs.mkdir(path.join(root,'docs/media/generated'),{recursive:true});
await fs.mkdir(path.join(root,'public/media/editorial'),{recursive:true});
const assets=[];
for(const entry of entries){
 const outputPath=path.join(root,'docs/media/generated',entry.id+'.png');
 const sourceFile=outputPath;
 const widths=[480,800,1200,1536];
 for(const width of widths)await sharp(sourceFile).resize({width,withoutEnlargement:true}).webp({quality:86,effort:5}).toFile(path.join(root,'public/media/editorial',`${entry.id}-${width}.webp`));
 assets.push({...entry,sourceSha256:entry.source?await sha(path.join(sourceRoot,entry.source)):null,originalOutput:`docs/media/generated/${entry.id}.png`,outputSha256:await sha(outputPath),webPrefix:`public/media/editorial/${entry.id}-`,webWidths:widths});
}
await fs.writeFile(path.join(root,'docs/editorial-visuals.json'),JSON.stringify({purpose:'Clearly labeled editorial illustrations, separate from original-photo evidence and product galleries.',assets},null,2)+'\n');
console.log(assets.map(({id,outputSha256})=>({id,outputSha256})));
