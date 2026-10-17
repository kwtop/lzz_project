import catalog from './catalog.json';
import {partDisplay} from './capabilityDesign';
import type {CapabilityArt} from './capabilityDesign';

export const capabilityConcepts:Record<string,CapabilityArt>={
 'cnc-milling-service':{stem:'/media/editorial-rebuild-20261015/milling-geometry',width:1448,height:1086,alt:'AI illustration of a milled component showing pockets, holes, internal radii and thin sections',caption:'Milled features · AI-generated illustration.'},
 'cnc-turning-service':{stem:'/media/editorial-rebuild-20261015/turning-geometry',width:1448,height:965,alt:'AI illustration of a turned component with shoulders, a bore, grooves and a threaded section',caption:'Turned features · AI-generated illustration.'},
 finish:{stem:'/media/editorial-rebuild-20261015/finish-comparison',width:1448,height:1086,alt:'AI illustration comparing a bare metal component and a treated component with protected working interfaces',caption:'Material and finish comparison · AI-generated illustration. Specify treatment, masking and final acceptance for the drawing.'},
};

export const capabilityIntros:Record<string,string>={
 'cnc-milling-service':'Custom blocks, brackets, housings and circular components with pockets, flat faces and hole patterns. Machined to your drawing for prototypes and small production runs.',
 'cnc-turning-service':'Custom shafts, sleeves and fittings with diameters, bores and threads around a shared axis. Secondary machining adds flats, slots and cross-holes where needed.',
 '5-axis-cnc-machining':'Custom components with angled faces or curved surfaces. We review the model, tool access and fixture clearance to select the machining route.',
 'casting-machining':'Finish machining for cast housings: bearing bores, sealing faces and mounting points made to the finished-part drawing.',
 'aluminum-cnc-parts':'Custom aluminum housings, covers and enclosures. Review the shape, alloy and temper together with the final surface treatment.',
 'stainless-steel-cnc-parts':'Stainless steel shafts, fittings and locking hardware made to your drawing, with the grade, condition and final treatment specified for the application.',
 'copper-brass-cnc-parts':'Custom copper and brass contacts, fittings and connectors. The electrical, thermal or sealing function guides the alloy and working surfaces.',
 'plastic-machined-parts':'Machined plastic insulators, guides and housings. Select the polymer for the working environment, then define the fits and measurement conditions.',
};
export const heroPartSlugs:Record<string,string>={
 'cnc-milling-service':'custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm',
 'cnc-turning-service':'custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier',
 '5-axis-cnc-machining':'ultra-high-precision-machining-services',
 'casting-machining':'oem-precision-cnc-machined-casting-housing-structural-enclosures',
 'aluminum-cnc-parts':'custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier',
 'stainless-steel-cnc-parts':'precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier',
 'copper-brass-cnc-parts':'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier',
 'plastic-machined-parts':'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances',
 'starting-with-a-sample':'oem-precision-cnc-machined-casting-housings',
 'low-volume-production':'precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier',
};
export const capabilityHeroPart=(slug:string)=>partDisplay(catalog.products.find(part=>part.slug===heroPartSlugs[slug])!);

// A single complete request list replaces the duplicated list and prose.
export const inquiryInputs:Record<string,string[]>={
 'cnc-milling-service':['Current 3D model and drawing, part number, units and revision','Material grade, stock condition and stock dimensions','Mating features, datums, holes, thin walls and permitted geometry or radius changes','Clamping faces, tool-access limits and intended assembly / operating conditions','Finish, masking, post-treatment acceptance and required tests or records','Quantity, delivery destination and requested date'],
 'cnc-turning-service':['Current model and drawing, part number, units and revision','Stock grade and condition, finish and quantity per release','Datum axis, working diameters, shoulders, bores and mating parts','Complete thread standard, engagement and sealing arrangement','Off-axis features, deburring access, inspection records and any functional-test methods / limits','Delivery destination and requested date'],
 '5-axis-cnc-machining':['Current native or neutral 3D model and controlled drawing revision','Finished and blank dimensions, weight, clamping areas and protected surfaces','Assembly clearances, mating-part envelope and tool / fixture access','Material grade and condition, finish, critical features and validation criteria','Traceability, final end use and applicable export requirements','Quantity, delivery destination and requested date'],
 'casting-machining':['Finished-part drawing and revision, blank photographs or model','Casting supplier, alloy, condition and number of castings','Blank acceptance, available machining allowance and rejected-blank responsibility','As-cast surfaces, locating targets, finished datums and sections for hidden features','Finish, inspection requirements and any separate pressure, porosity or non-destructive tests','Any sample reconstruction, measurements and approval responsibility','Delivery destination and requested date'],
 'aluminum-cnc-parts':['Current model and drawing revision, alloy, temper and stock form','Wall thickness, datum faces, sealing interfaces and intended assembly','Treatment standard, masking, cosmetic faces and final dimensions','For fabricated or welded parts: supplied items, joint requirements and separate test conditions','Quantity, delivery destination and requested date'],
 'stainless-steel-cnc-parts':['Current drawing revision, exact grade, condition and service environment','Working diameters, datum axis, threads and mating-part requirements','Finish, passivation or electropolishing specification','Post-treatment dimensions, material records and functional requirements','Quantity, delivery destination and requested date'],
 'copper-brass-cnc-parts':['Current drawing revision, exact alloy designation and standard','Electrical, thermal or sealing function and assembly information','Threads, passages, contact / seal faces and finish or plating specification','Final dimensions and functional-test methods, limits and records','Material restrictions and requested declarations; availability to be confirmed','Quantity, delivery destination and requested date'],
 'plastic-machined-parts':['Current model and drawing revision, selected grade or selection constraints','Polymer, fillers, stock condition, temperature, loads, chemical and moisture exposure','Fits, inserts, thin walls and assembly interfaces','Conditioning, dimensional inspection state and required material documents or functional tests','Quantity, delivery destination and requested date'],
 'prototype-machining':['Current model and drawing revision, fixed interfaces and open design decisions','Fit, assembly, appearance or defined functional question','Material and finish for this evaluation, including approved alternatives','Checks, records, test responsibility and authorized approver','Prototype quantity, planned next revision or later batch','Delivery destination and requested date'],
 'low-volume-production':['Part numbers, approved revisions and quantity for each initial release','Expected repeat demand as a forecast, with requested release dates for confirmation','Material, condition, finish and approved alternatives per line item','First-article hold points, sampling, traceability records and change approval','Packing, identification, required documentation and delivery destination','Commercial terms and actual order quantities to be agreed separately'],
 'starting-with-a-sample':['Sample photographs, overall dimensions, mating parts and intended use','Known material, finish and available drawings; mark unknowns','Wear, damage, features to retain and intended changes','Measurement / reconstruction scope, model and drawing deliverables, and approval authority','First-part quantity, fit or functional checks and acceptance limits','Expected repeat demand, delivery destination and requested date'],
};

export const applicationRequirements:Record<string,{title:string;text:string}[]>={
 'cnc-milling-service':[
  {title:'Agricultural machinery',text:'Include operating conditions with housing and bracket drawings. Shafts and their rotational features are reviewed through CNC turning.'},
  {title:'Semiconductor equipment',text:'Define cleanliness, chemical exposure and any ESD limits for equipment housings and interfaces. Specify the tests and documentation required for the application.'},
 ],
 'cnc-turning-service':[{title:'Medical devices & industrial equipment',text:'Supply the equipment drawing, material specification and inspection criteria. State the intended use, functional requirements and any application approvals needed.'}],
 '5-axis-cnc-machining':[
  {title:'Robotics & automation',text:'Show mounting interfaces, sensor or bracket locations, assembly clearances and access requirements. State any suitability or approval requirements for the equipment.'},
  {title:'Industrial fans & impellers',text:'Review blade hubs and rotating forms for tool access, material and inspection requirements. Balance and rotor validation require separate methods and acceptance limits.'},
  {title:'Aerospace & defense equipment',text:'Include the drawing, traceability requirements, final end use and applicable export requirements for the proposed component.'},
 ],
 'prototype-machining':[{title:'Automotive & motorcycle prototypes',text:'Covers, intake components and throttle housings can support design and assembly checks. State the development question; vehicle-performance validation and any pressure or functional tests are separate scopes.'}],
};
