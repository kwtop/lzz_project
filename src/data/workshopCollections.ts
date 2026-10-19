import media from './additionalMedia.generated.json';

type PhotoId=keyof typeof media.photos;
type VideoId=keyof typeof media.videos;
export interface CollectionSection {
 id:string; title:string; copy:string; photos?:PhotoId[];
 video?:{id:VideoId;title:string;description:string};
}
export const workshopCollections:Record<string,CollectionSection[]>={
 plastic:[
  {id:'ptfe',title:'PTFE components and stepped shafts',copy:'The PTFE collection contains several separate part types, from small components with holes to long stepped shafts. For a similar part, specify the grade and mating features on the drawing, with the dimensions that control fit.',photos:['plastic-ptfe-batch','plastic-ptfe-intermediate','plastic-ptfe-shafts'],video:{id:'plastic-ptfe-parts',title:'PTFE part forms in the workshop',description:'White components on a dark work surface, including round bases with projecting features. The workshop collection identifies these as PTFE parts.'}},
  {id:'pom',title:'POM gear teeth and hub details',copy:'The POM gear has a raised hub and central bore, with other gear forms visible in the clip. A drawing for a similar gear needs the tooth specification and hub dimensions. Include the mating-part details and exact polymer grade, with acceptance limits for the teeth and interfaces.',video:{id:'plastic-pom-gears',title:'A closer look at the POM gear',description:'A close view of the teeth and raised hub of a white gear.'}},
  {id:'pe',title:'Straight and curved PE guide strips',copy:'These green PE guide strips have straight and curved profiles. Show the cross-section and path on your drawing, with mounting features and mating interfaces. Mark sliding surfaces and state their dimensional and surface requirements.',video:{id:'plastic-pe-guides',title:'PE guide-strip examples',description:'The original clip shows a group of green straight and curved strips on the workshop floor.'}},
  {id:'acrylic',title:'Acrylic components and viewing surfaces',copy:'The acrylic examples include circular components with stepped rims and a separate rectangular part with machined features. Mark viewing surfaces on your drawing and define cosmetic limits. Include handling requirements and any optical specification..',photos:['plastic-acrylic-batch','plastic-acrylic-detail'],video:{id:'plastic-acrylic-parts',title:'Transparent acrylic part details',description:'A clear rectangular component is held in front of the machine, showing circular recesses, holes and machined features from an oblique angle.'}},
 ],
 metal:[
  {id:'turned-parts',title:'Turned shoulders, threads and mating diameters',copy:'The turned examples show shoulders and flanges, with threaded sections on some components. For a similar part, define the datum axis and mating diameters. Include thread designations and axial dimensions on the controlled drawing, which sets the acceptance limits.',photos:['metal-turned-shaft','metal-turned-batch']},
  {id:'aluminum-housings',title:'Aluminum housings: cavities and mounting features',copy:'These rectangular aluminum housings have internal cavities and perimeter mounting holes. The close views show wall geometry around the interfaces. For a similar housing, locate mounting features from the drawing datums and specify the finish on cosmetic faces.',photos:['metal-aluminum-housings','metal-aluminum-close']},
  {id:'brass-fittings',title:'Brass fittings and interfaces',copy:'The brass collection shows small fitting-like components in a batch. Specify the exact alloy and thread standard for your order, with sealing or mating surfaces identified. Include material records and any functional tests required..',photos:['metal-brass-batch']},
  {id:'batch-handling',title:'Aluminum parts after cleaning',copy:'A person moves small metal components in a blue tray. The workshop file identifies them as aluminum parts after cleaning. The clip shows the part forms, without identifying the cleaning process or documenting final acceptance and shipment.',video:{id:'metal-cleaned-parts',title:'Small metal components in a batch',description:'Small components in a blue tray, identified in the workshop file as aluminum parts after cleaning. Dimensions and inspection results are not shown.'}},
 ],
};
