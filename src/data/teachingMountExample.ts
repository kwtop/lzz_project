/** One teaching dataset supplies the article, annotated drawing and CSV download. */
export interface TeachingFeature {
 id:'F1'|'F2'|'F3';
 name:string;
 nominal:number;
 tolerance:number;
 sample:number;
 purpose:string;
 check:string;
}

export const teachingMountExample={
 id:'EX-MOUNT-01',
 material:'6061-T6',
 units:'mm',
 size:{length:60,width:40,thickness:12},
 holes:[{id:'H1',x:20,y:20},{id:'H2',x:40,y:20}],
 notice:'Teaching example only. All measurement values are illustrative, not LZZ production or inspection records.',
 drawingNotice:'Teaching sketch, not a complete production drawing. Unspecified dimensions are reference geometry only.',
 datums:[
  {id:'A',face:'Underside mounting face',purpose:'Supports the plate in its mounted and measured condition.'},
  {id:'B',face:'Short left side',purpose:'Provides a side reference for locating the plate.'},
  {id:'C',face:'Long front side',purpose:'Provides the remaining side reference.'},
 ],
 features:[
  {id:'F1',name:'H1 bore diameter',nominal:10,tolerance:0.02,sample:10.01,purpose:'Controls the size of the illustrated locating hole.',check:'A bore-size measurement checks this limit. It does not establish hole form or location.'},
  {id:'F2',name:'H1 to H2 centre distance',nominal:20,tolerance:0.05,sample:20.03,purpose:'Controls the illustrated spacing between the two hole centres.',check:'Evaluate both hole centres in a consistent setup. This size check is not a complete position tolerance.'},
  {id:'F3',name:'Plate thickness',nominal:12,tolerance:0.05,sample:12.08,purpose:'Controls the distance from the underside mounting face to the opposite face.',check:'Measure in the stated final condition, then compare the reading with both limits.'},
 ] satisfies TeachingFeature[],
};

export const teachingDownloads={drawing:'/downloads/ex-mount-01-teaching.svg',report:'/downloads/ex-mount-01-teaching-inspection.csv'};
const fixed=(value:number)=>value.toFixed(2);
export const featureLimits=(feature:TeachingFeature)=>({lower:Number(fixed(feature.nominal-feature.tolerance)),upper:Number(fixed(feature.nominal+feature.tolerance))});
export const featurePasses=(feature:TeachingFeature)=>{
 const {lower,upper}=featureLimits(feature);
 return feature.sample>=lower&&feature.sample<=upper;
};
export const featureRequirement=(feature:TeachingFeature)=>`${fixed(feature.nominal)} ±${fixed(feature.tolerance)} ${teachingMountExample.units}`;
export const featureRange=(feature:TeachingFeature)=>{const {lower,upper}=featureLimits(feature);return `${fixed(lower)} to ${fixed(upper)}`;};
export const featureSample=(feature:TeachingFeature)=>fixed(feature.sample);
export const teachingRelease=()=>{
 const failed=teachingMountExample.features.filter(feature=>!featurePasses(feature));
 return failed.length?`Hold release: ${failed.map(feature=>feature.id).join(', ')} ${failed.length===1?'is':'are'} outside ${failed.length===1?'its illustrated limit':'their illustrated limits'}`:'Within the illustrated limits';
};

const xml=(text:string)=>text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

export function renderTeachingDrawing():string {
 const example=teachingMountExample,[diameter,spacing,thickness]=example.features;
 // The two views share one scale, and hole positions are model coordinates.
 const scale=8,left=110,top=172;
 const length=example.size.length*scale,width=example.size.width*scale;
 const bottom=top+width,right=left+length,sideTop=660;
 const holeY=top+example.holes[0].y*scale;
 const firstX=left+example.holes[0].x*scale,secondX=left+example.holes[1].x*scale;
 const circle=(hole:typeof example.holes[number])=>{
  const x=left+hole.x*scale,y=top+hole.y*scale,r=diameter.nominal*scale/2;
  return `<g data-hole="${hole.id}"><circle cx="${x}" cy="${y}" r="${r}"/><path class="centre" d="M${x-r-16} ${y}h${2*r+32} M${x} ${y-r-16}v${2*r+32}"/><text x="${x-r-12}" y="${y+r+30}" text-anchor="end">${hole.id}</text></g>`;
 };
 const datum=(id:string,x:number,y:number,path:string)=>`<g class="datum"><path d="${path}"/><rect x="${x}" y="${y}" width="32" height="30"/><text x="${x+16}" y="${y+22}" text-anchor="middle">${id}</text></g>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" class="teaching-engineering-drawing" viewBox="0 0 940 940" width="940" height="940" role="img" aria-labelledby="example-title example-description">
 <title id="example-title">${example.id}: teaching mounting plate</title>
 <desc id="example-description">${xml(example.notice)} ${example.size.length} by ${example.size.width} by ${example.size.thickness} millimetres, ${example.material}. A is the underside, B the left side and C the front side. F1 is the H1 diameter, F2 the hole centre distance and F3 the thickness.</desc>
 <defs><marker id="dimension-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="#252826"/></marker></defs>
 <style>.teaching-engineering-drawing text{fill:#252826;font:18px Arial,sans-serif;stroke:none}.teaching-engineering-drawing .heading{font-size:28px;font-weight:700}.teaching-engineering-drawing .small{font-size:16px}.teaching-engineering-drawing .outline{fill:#fff;stroke:#252826;stroke-width:2.5}.teaching-engineering-drawing .outline circle{fill:#F5F3EF}.teaching-engineering-drawing .centre{fill:none;stroke:#656660;stroke-width:1;stroke-dasharray:12 5 2 5}.teaching-engineering-drawing .dimension{fill:none;stroke:#252826;stroke-width:1.2}.teaching-engineering-drawing .measure{marker-start:url(#dimension-arrow);marker-end:url(#dimension-arrow)}.teaching-engineering-drawing .accent{fill:#AC4829;font-weight:700}.teaching-engineering-drawing .leader{fill:none;stroke:#AC4829;stroke-width:1.5}.teaching-engineering-drawing .datum path{fill:none;stroke:#252826;stroke-width:1.5}.teaching-engineering-drawing .datum rect{fill:#252826}.teaching-engineering-drawing .datum text{fill:#fff;font-weight:700}.teaching-engineering-drawing .note{fill:#656660}</style>
 <rect width="940" height="940" fill="#F5F3EF"/>
 <text x="36" y="45" class="heading">${example.id}</text><text x="36" y="74">${example.material} · ${example.size.length} × ${example.size.width} × ${example.size.thickness} ${example.units}</text>
 <text x="36" y="104" class="accent small">TEACHING DRAWING · NO PRODUCTION OR INSPECTION CLAIM</text>
 <g class="outline"><rect x="${left}" y="${top}" width="${length}" height="${width}"/>${example.holes.map(circle).join('')}</g><text x="${left+16}" y="${top+30}" class="small note">TOP VIEW</text>
 <g class="dimension"><path d="M${left} ${top-3}v-38 M${right} ${top-3}v-38"/><path class="measure" d="M${left} ${top-30}H${right}"/></g><text x="${left+length/2}" y="${top-42}" text-anchor="middle">${example.size.length} REF</text>
 <g class="dimension"><path d="M${left-3} ${top}H54 M${left-3} ${bottom}H54"/><path class="measure" d="M68 ${top}V${bottom}"/></g><text x="52" y="${top+width/2}" text-anchor="middle" transform="rotate(-90 52 ${top+width/2})">${example.size.width} REF</text>
 <g class="leader"><path d="M${firstX+diameter.nominal*scale/2-10} ${holeY-26} 655 214H890"/></g><text x="655" y="198" class="accent">F1 · ⌀${xml(featureRequirement(diameter))}</text>
 <path class="leader" d="M${secondX+25} ${holeY+30} 655 400H860"/><text x="655" y="386">H2 · ⌀${fixed(diameter.nominal)} REF</text>
 <g class="dimension"><path d="M${firstX} ${holeY+52}V558 M${secondX} ${holeY+52}V558"/><path class="measure" d="M${firstX} 543H${secondX}"/></g><text x="${(firstX+secondX)/2}" y="578" text-anchor="middle" class="accent">F2 · ${xml(featureRequirement(spacing))}</text>
 ${datum('B',left-42,bottom-78,`M${left} ${bottom-63}h-10`)}
 ${datum('C',right-72,bottom+16,`M${right-56} ${bottom}v16`)}
 <text x="${left}" y="${sideTop-24}" class="small note">SIDE VIEW</text><rect class="outline" x="${left}" y="${sideTop}" width="${length}" height="${example.size.thickness*scale}"/>
 <g class="dimension"><path d="M${right+3} ${sideTop}h61 M${right+3} ${sideTop+example.size.thickness*scale}h61"/><path class="measure" d="M${right+48} ${sideTop}v${example.size.thickness*scale}"/></g><text x="${right+74}" y="${sideTop+36}" class="accent">F3</text><text x="${right+74}" y="${sideTop+63}">${xml(featureRequirement(thickness))}</text>
 ${datum('A',left+80,sideTop+example.size.thickness*scale+20,`M${left+96} ${sideTop+example.size.thickness*scale}v20`)}<text x="${left+126}" y="${sideTop+example.size.thickness*scale+42}" class="small">Underside mounting face</text>
 <text x="36" y="856" class="small note">A: underside · B: short left side · C: long front side</text>
 <text x="36" y="885" class="small note">Reference geometry is shown for reading the example; no GD&amp;T position or form control is implied.</text>
 <text x="36" y="914" class="small note">Teaching sketch only. Not a complete manufacturing drawing or an inspection record.</text>
 </svg>`;
}

export function renderTeachingInspectionCsv():string {
 const example=teachingMountExample;
 const rows:(string|number)[][]=[
  ['Purpose',example.notice],['Drawing status',example.drawingNotice],
  ['Example',example.id],['Material',example.material],
  ['Nominal envelope',`${example.size.length} x ${example.size.width} x ${example.size.thickness} ${example.units}`],
  ['Reference faces',example.datums.map(d=>`${d.id}: ${d.face}`).join('; ')],
  ['Condition','Illustrative final machined condition before any surface treatment'],
  ['Acceptance note','Simple numerical comparison only; measurement uncertainty and the production decision rule are not modelled.'],
  [],['Feature','Description','Nominal (mm)','Tolerance ± (mm)','Lower limit (mm)','Upper limit (mm)','Illustrative measurement (mm)','Example result'],
  ...example.features.map(feature=>{const limits=featureLimits(feature);return [feature.id,feature.name,fixed(feature.nominal),fixed(feature.tolerance),fixed(limits.lower),fixed(limits.upper),featureSample(feature),featurePasses(feature)?'Pass':'Fail'];}),
  [],['Example release decision',teachingRelease()],
 ];
 const cell=(value:string|number)=>'"'+String(value).replace(/"/g,'""')+'"';
 return '\uFEFF'+rows.map(row=>row.map(cell).join(',')).join('\r\n')+'\r\n';
}
