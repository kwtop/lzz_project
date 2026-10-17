import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import {fileURLToPath} from 'node:url';

// Rebuilds web derivatives and a source audit without changing the supplied originals.
const sourceRoot='D:/lzz/原始资料';
const outputRoot=new URL('../public/media/evidence/',import.meta.url);
const auditRoot=new URL('../docs/',import.meta.url);
const dataFile=new URL('../src/data/evidence.generated.json',import.meta.url);
const prefix='力智造-素材资料照片/力智造-素材资料照片/';
const selected=[
 ['workshop-wide','10，Producing Department-生产车间/1 (7).jpg','LZZ machining workshop; original site photograph.','Rows of enclosed CNC machines inside the LZZ workshop.','home,factory'],
 ['workshop-aisle','20251201/车间照片/a2e689129271aafee43bc86bb5cb0933.jpg','LZZ production floor; source folder dated December 2025.','Machining centers along an aisle in the LZZ workshop.','factory,about'],
 ['workshop-floor','20251201/车间照片/4787147060a71822ebce6378539086fe.jpg','LZZ workshop floor; source folder dated December 2025.','Machine tools and work area in the LZZ workshop.','factory'],
 ['cmm-room','10，Producing Department-生产车间/1 (84).jpg','Coordinate measuring machine in LZZ source workshop photographs; historical site photograph.','Coordinate measuring machine in the LZZ inspection area.','quality,factory'],
 ['cmm-detail','10，Producing Department-生产车间/1 (85).jpg','Coordinate measuring machine detail; historical site photograph.','Closer view of a coordinate measuring machine.','quality'],
 ['five-axis-operation','20251203力智造产品加工过程中图片/产品1-五轴加工/db22827e75937add7eb7e1636af6ab94.jpg','Five-axis machining operation; original LZZ process photograph.','Metal workpiece mounted on a trunnion beneath a CNC spindle.','case-five-axis,factory'],
 ['five-axis-machine-wide','20251203力智造产品加工过程中图片/产品1-五轴加工/d3928b0409cc533dffd9561fedbb4b63.jpg','Wider view of a five-axis machining setup; original LZZ process photograph.','Five-axis machining center with a workpiece on a rotary trunnion beneath the spindle.','home,factory'],
 ['five-axis-parts','20251203力智造产品加工过程中图片/产品1-五轴加工/f743ece664101831b1f642aad280916f.jpg','Finished parts pictured in the five-axis process set; original LZZ photograph.','Batch of machined metal components with multiple visible faces.','case-five-axis'],
 ['turning-operation','20251203力智造产品加工过程中图片/产品2-车加工/6c06c0a46e0bf5eae2d41d80616b236e.jpg','CNC turning operation; original LZZ process photograph.','Rotating metal workpiece being machined inside a CNC lathe.','factory,capability-turning'],
 ['turning-parts','20251203力智造产品加工过程中图片/产品2-车加工/e3c1ae6bd215f8723dcdda496d91eb34.jpg','Parts photographed in the CNC turning source set; original LZZ photograph.','A group of turned metal discs with central bores.','capability-turning'],
 ['aluminum-housings','20251201/铝制零件/b9a2df3748dfeb55c9360a118a465f5d.jpg','Machined aluminum housings in LZZ source materials; source folder dated December 2025.','A group of machined aluminum housings showing pockets, bores and fastening features.','capability-aluminum,home-materials,product-directory'],
 ['display-housing-panel','20250108-29寸显示屏外壳/4d2ffc8e44b552fe7c8fd6754455aa4d.jpg','Machined display housing panel in LZZ source materials; source folder dated January 2025.','Complete machined aluminum display housing panel with visible contours and slots.','capability-aluminum'],
 ['display-housing-machining','20250108-29寸显示屏外壳/8f3aa98a32a0260275a218aa1b001183.jpg','Display housing panel at the CNC machine; source folder dated January 2025.','Large aluminum display housing panel under a CNC spindle during machining.','capability-aluminum'],
 ['brass-plugs','20251201/黄铜零件/7db93e137da06879e3824ff60569d9f1.jpg','Threaded plugs in the LZZ brass-parts source folder dated December 2025.','Batch of short hex-head threaded metal plugs in a blue bin.','capability-brass'],
 ['turn-mill-operation','20251203力智造产品加工过程中图片/产品3-车加工完成后的铣加工/44a8d35e74bf5e21513fcef0db0caf80.jpg','Milling after turning; original LZZ process photograph.','Previously turned component mounted for a milling operation.','case-turn-mill,factory'],
 ['turn-mill-parts','20251203力智造产品加工过程中图片/产品3-车加工完成后的铣加工/ed1b33497e19f41bba39fb5f5fdd34c4.jpg','Parts pictured after the turning and milling sequence; original LZZ photograph.','Circular machined metal components grouped in a blue bin.','case-turn-mill'],
 ['two-stage-first','20251203力智造产品加工过程中图片/产品6-同一个产品-2个不同工序的铣加工/15af15bf59dadc3a3daf31888ada46b6.jpg','First pictured milling setup for the same part; original LZZ process photograph.','Metal part fixed for one milling operation.','case-two-stage,factory,capability-directory,capability-milling'],
 ['two-stage-second','20251203力智造产品加工过程中图片/产品6-同一个产品-2个不同工序的铣加工/d31c871835ad1c575272ad874ebe3f55.jpg','Second pictured milling setup for the same part; original LZZ process photograph.','The same part shown in another milling setup.','case-two-stage'],
 ['shipping-example','17，发货资料/IMG_20221121_091701.jpg','Historical shipment preparation photograph from LZZ source materials; packing varies by order.','Packed machining order photographed before dispatch.','how-we-work,factory'],
 ['team-gathering','15,2025-5月公司团建/IMG_20250512_175348.jpg','LZZ team gathering; source folder dated May 2025.','LZZ team members seated together during an outdoor gathering.','about'],
 ['trade-event','11，参加活动-20251119中非经贸西湖大会/019c8a44607be10f8548080bb1498a1f.jpg','LZZ team member at a Hangzhou trade event; source folder dated November 2025.','Attendee photographed in front of the West Lake Summit event backdrop.','about'],
 ['workshop-visit','20250107澳大利亚客户上门参观/df0670b458eeaf1276569d1e2d4d51f4.jpg','Workshop visit photographed in LZZ source materials; source folder dated January 2025.','Two people photographed in the LZZ machining workshop.','about'],
 ['visitor-machining-tour','20250107澳大利亚客户上门参观/ded911a55e01131860430bd949957500.jpg','Workshop visit photographed in LZZ source materials; source folder dated January 2025.','Visitors viewing CNC machinery during a workshop visit.','about'],
 ['visitor-part-discussion','20250107澳大利亚客户上门参观/ede21f91855931fcf1764bd51accbbc1.jpg','Part discussion photographed during a workshop visit; source folder dated January 2025.','Visitors and LZZ staff reviewing a machined part at a table.','about'],
 ['milling-enclosure-operation','20251203力智造产品加工过程中图片/产品4-铣加工/0a5402c99ab04d0826457ec57f22fbc8.jpg','CNC milling operation photographed in LZZ process materials; source folder dated December 2025.','A metal component held in a CNC milling setup beneath the spindle.','case-milling-enclosure,factory,capability-milling'],
 ['milling-enclosure-parts','20251203力智造产品加工过程中图片/产品4-铣加工/cad544d5f3f868d241fb876c7708b7b0.jpg','Machined parts photographed in LZZ process materials; source folder dated December 2025.','A group of matching machined components with circular pockets and mounting features.','case-milling-enclosure'],
 ['multi-feature-milling-operation','20251203力智造产品加工过程中图片/产品5-铣加工/e6a69f3c28f7cf2a9b7705ee55e342d4.jpg','CNC milling operation photographed in LZZ process materials; source folder dated December 2025.','CNC milling setup machining a prismatic metal component.','case-multi-feature-milling,factory,capability-milling'],
 ['multi-feature-milling-parts','20251203力智造产品加工过程中图片/产品5-铣加工/0fa877b4559cd1377b9c6109f008f635.jpg','Machined parts photographed in LZZ process materials; source folder dated December 2025.','Several matching prismatic machined components arranged together.','case-multi-feature-milling'],
 ['team-2025-november-group','20251130-公司团建/2ca7107bf423f50a60bb1e6ae1eb6937.jpg','LZZ team activity photograph; source folder dated November 2025.','Adult team members gathered outdoors beneath a company activity banner.','about'],
 ['team-2025-november-meal','20251130-公司团建/1e9b9e261d84f13e9aff7f12e2d2b4aa.jpg','LZZ team activity photograph; source folder dated November 2025.','Adult colleagues sharing a meal during a company gathering.','about'],
 ['team-activity-2024','14,2024年公司团建/IMG_20241117_100535.jpg','LZZ team activity photograph; source file dated November 17, 2024.','LZZ employees gathered beneath a company banner during a team activity in November 2024.','about'],
 ['team-2024-outdoor','14,2024年公司团建/IMG_20241117_100326.jpg','Team activity photograph from LZZ source archive; source file dated November 2024.','LZZ colleagues gathered outdoors beneath a company banner during a November 2024 team activity.','about'],
 ['team-2024-shared-meal','14,2024年公司团建/IMG_20241117_115048.jpg','Team gathering photograph from LZZ source archive; source file dated November 2024.','LZZ colleagues sharing a meal during a November 2024 company gathering.','about'],
 ['team-2024-riverside-group','14,2024年公司团建/IMG_20241117_141027.jpg','Team activity photograph from LZZ source archive; source file dated November 2024.','LZZ colleagues together on outdoor steps during a November 2024 team activity.','about'],
 ['team-2025-evening-group','15,2025-5月公司团建/IMG_20250512_194928.jpg','Team gathering photograph from LZZ source archive; source file dated May 2025.','LZZ colleagues posing together outside during a May 2025 company gathering.','about'],
 ['team-2025-team-outing','15,2025-5月公司团建/IMG_20250512_195946.jpg','Team gathering photograph from LZZ source archive; source file dated May 2025.','LZZ colleagues gathered together during a May 2025 company outing.','about'],
 ['shipment-2022-order-packing','17，发货资料/IMG_20221120_161920.jpg','Protected parts prepared for packing in a historical LZZ delivery photograph; source file dated November 2022.','Machined parts protected and arranged in packing materials before dispatch.','how-we-work,factory'],
 ['shipment-2022-prepared-load','17，发货资料/IMG_20221121_091824.jpg','Prepared shipment photographed in LZZ historical delivery archive; source file dated November 2022.','Protected packed components arranged in a loading area before dispatch.','how-we-work,factory'],
 ['workshop-operators-2025','10，Producing Department-生产车间/微信图片_20251104221718_145_246.jpg','Workshop-floor photograph from LZZ production-department archive; source file dated November 2025.','Two workers among CNC machines on the LZZ workshop floor.','factory'],
];
const proofScopes={
 'workshop-wide':'Workshop interior and enclosed CNC machine row; not a current machine-count audit.',
 'workshop-aisle':'Workshop aisle and machine placement at source time.',
 'workshop-floor':'Workshop production area at source time.',
 'cmm-room':'Presence of a coordinate measuring machine; not its calibration status or measurement result.',
 'cmm-detail':'Visible coordinate measuring machine detail; not a measurement result.',
 'five-axis-operation':'A workpiece held in a multi-axis machining setup.',
 'five-axis-machine-wide':'Visible five-axis machining center and rotary setup; not a capability range or measured result.',
 'five-axis-parts':'Visible finished geometry in the five-axis process group; not material or tolerance.',
 'turning-operation':'Metal workpiece undergoing CNC turning.',
 'turning-parts':'Visible turned discs from the turning process source group; not a material grade or acceptance result.',
 'aluminum-housings':'Visible machined housings in the aluminum-parts source group; not a measured grade or tolerance.',
 'display-housing-panel':'Visible large display housing panel; source folder identifies the project as a 29-inch display enclosure, not a drawing or dimensional measurement.',
 'display-housing-machining':'Visible CNC machining of a display housing panel; not an inspection result.',
 'brass-plugs':'Visible threaded plugs in the brass-parts source group; not an alloy certification or dimensional result.',
 'turn-mill-operation':'Milling setup for the source group labeled turning followed by milling.',
 'turn-mill-parts':'Visible circular machined components; not dimensional acceptance.',
 'two-stage-first':'One documented milling setup for the same source product.',
 'two-stage-second':'Another documented milling setup for the same source product.',
 'shipping-example':'Historical protected packing and shipment preparation; not a standard packing specification.',
 'team-gathering':'People together at a company activity; not evidence of machining capacity or project outcomes.',
 'trade-event':'Attendance at the named event; not endorsement by event organizers or other attendees.',
 'workshop-visit':'A visit photographed in the workshop; not evidence of the visitor’s identity, contract or project outcome.',
 'visitor-machining-tour':'A workshop visit and visible machinery; not evidence of visitor identity, contract, endorsement or project outcome.',
 'visitor-part-discussion':'A part discussion during a workshop visit; not evidence of visitor identity, approval or customer outcome.',
 'milling-enclosure-operation':'A component in a CNC milling setup; not a verified alloy, tolerance or acceptance result.',
 'milling-enclosure-parts':'Visible matching components in the milling source set; not a verified order quantity, alloy or dimensional result.',
 'multi-feature-milling-operation':'A prismatic component in a milling setup; not a verified alloy, tolerance or acceptance result.',
 'multi-feature-milling-parts':'Visible matching components in the milling source set; not a verified order quantity, alloy or dimensional result.',
 'team-2025-november-group':'A documented company activity; not production evidence, customer endorsement or project outcome.',
 'team-2025-november-meal':'A documented company activity; not production evidence, customer endorsement or project outcome.',
 'team-activity-2024':'A company team activity; not customer endorsement, production evidence or project outcome.',
 'team-2024-outdoor':'A documented company activity; not production evidence, customer endorsement or project outcome.',
 'team-2024-shared-meal':'A documented company activity; not production evidence, customer endorsement or project outcome.',
 'team-2024-riverside-group':'A documented company activity; not production evidence, customer endorsement or project outcome.',
 'team-2025-evening-group':'A documented company activity; not production evidence, customer endorsement or project outcome.',
 'team-2025-team-outing':'A documented company activity; not production evidence, customer endorsement or project outcome.',
 'shipment-2022-order-packing':'Historical order packing preparation; source materials do not identify destination, carrier or trade terms.',
 'shipment-2022-prepared-load':'Historical shipment preparation; source materials do not identify destination, carrier or trade terms.',
 'workshop-operators-2025':'Workers and machines visible in one historical workshop photograph; not a current staffing or machine-count audit.',
};
const imageTypes=new Set(['.jpg','.jpeg','.png','.webp','.avif','.bmp','.tif','.tiff','.gif']);
const videoTypes=new Set(['.mp4','.mov','.avi','.m4v','.webm']);
const slash=p=>p.split(path.sep).join('/');
const sha=async file=>crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
async function walk(dir){const result=[];for(const entry of await fs.readdir(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())result.push(...await walk(full));else result.push(full);}return result;}
await fs.mkdir(outputRoot,{recursive:true});await fs.mkdir(auditRoot,{recursive:true});
const files=(await walk(sourceRoot)).filter(file=>imageTypes.has(path.extname(file).toLowerCase())||videoTypes.has(path.extname(file).toLowerCase()));
const videoReview=JSON.parse(await fs.readFile(new URL('../docs/qa/video-review.json',import.meta.url),'utf8').catch(()=> '[]'));
const reviewedVideos=new Map(videoReview.map(item=>[item.source,item]));
const selectedByPath=new Map(selected.map(item=>[prefix+item[1],item]));
const audit=[];const published={};
for(const file of files){
 const relative=slash(path.relative(sourceRoot,file));const ext=path.extname(file).toLowerCase();
 const record={source:relative,sha256:await sha(file),kind:videoTypes.has(ext)?'source-video':'source-raster-image',status:'not-published',review:'not-selected',originAssessment:/AI生成|豆包/.test(relative)?'generated-illustration':relative.includes('检测仪器图片')?'requires-AI-origin-check':relative.includes('针对性图片')?'third-party-reference':'unverified-source-file'};
 if(videoTypes.has(ext)&&reviewedVideos.has(relative)){const reviewed=reviewedVideos.get(relative);record.review='visually-screened';record.video={duration:reviewed.duration,width:reviewed.width,height:reviewed.height,publish:false,decision:reviewed.decision};}
 if(imageTypes.has(ext)){try{const meta=await sharp(file).metadata();record.width=meta.width;record.height=meta.height;}catch{record.review='unreadable-image';}}
 const item=selectedByPath.get(relative);
 if(item){
  const [id,,caption,alt,uses]=item;
  if(!record.width||!record.height)throw new Error(`Image has no readable dimensions: ${relative}`);
  record.status='published';record.review='hand-selected';record.originAssessment='LZZ-source-photograph';record.uses=uses.split(',');record.proofScope=proofScopes[id];record.publicCaption=caption;
  // The source shipment photograph contains paper labels around the edges.
  // Publish only the label-free center; retain its source hash in the audit.
  const crop=id==='shipping-example'?{left:400,top:1300,width:2400,height:1800}:undefined;
  if(crop)record.publicationCrop=crop;
  const webWidth=crop?.width||record.width,webHeight=crop?.height||record.height;
  const widths=[480,800,1200,1600].filter(width=>width<=webWidth);
  if(!widths.length)widths.push(webWidth);
  for(const width of widths){let pipeline=sharp(file).rotate();if(crop)pipeline=pipeline.extract(crop);await pipeline.resize({width,withoutEnlargement:true}).webp({quality:86,effort:5}).toFile(fileURLToPath(new URL(`${id}-${width}.webp`,outputRoot)));}
  const largest=widths.at(-1);
  published[id]={id,src:`/media/evidence/${id}-${largest}.webp`,srcset:widths.map(width=>`/media/evidence/${id}-${width}.webp ${width}w`).join(', '),width:webWidth,height:webHeight,caption,alt,source:relative,sha256:record.sha256,kind:'original-photo',uses:record.uses,proofScope:record.proofScope};
 }
 audit.push(record);
}
if(Object.keys(published).length!==selected.length)throw new Error(`Selected ${selected.length}, found ${Object.keys(published).length}`);
const duplicates=new Map();for(const record of audit){const list=duplicates.get(record.sha256)||[];if(list.length)record.duplicateOf=list[0];list.push(record.source);duplicates.set(record.sha256,list);}
const report={generatedAt:new Date().toISOString(),sourceRoot:'D:/lzz/原始资料',counts:{images:audit.filter(r=>r.kind==='source-raster-image').length,videos:audit.filter(r=>r.kind==='source-video').length,selected:selected.length,duplicateGroups:[...duplicates.values()].filter(v=>v.length>1).length,duplicateCopies:[...duplicates.values()].reduce((total,v)=>total+Math.max(0,v.length-1),0)},files:audit};
await fs.writeFile(new URL('source-evidence-inventory.json',auditRoot),JSON.stringify(report,null,2)+'\n');
await fs.writeFile(dataFile,JSON.stringify(published,null,2)+'\n');
console.log(report.counts);
