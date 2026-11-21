export interface EngineeringCase {
 slug:string;title:string;lead:string;process:string;hero:string;photos:string[];
 workpiece:string;setup:string;visible:string;inspection:string;relatedCapabilities:string[];
 video?:'display-housing';
 collection?:'plastic'|'metal';
}
// These are process-photo studies, not customer performance claims. Details not
// visible in the source photos remain requirements to confirm from a drawing.
export const engineeringCases:EngineeringCase[]=[
  {
    "slug": "five-axis-machining-multi-face-parts",
    "title": "Five-axis machining for multiple faces",
    "process": "Multi-axis machining",
    "hero": "five-axis-operation",
    "photos": [
      "five-axis-operation",
      "five-axis-parts"
    ],
    "lead": "When do holes and contours on several faces need five-axis access? See how common datums, cutter clearance and workholding influence the route for a new part.",
    "workpiece": "The workshop photograph shows access around a rotary assembly. For a similar component, holes and contours on different faces need both a usable tool direction and references that remain meaningful after rotation.",
    "setup": "The workpiece is held in front of a rotary assembly, with spindle access from above. Tool reach and clearance around the fixture need to be checked for each face before the machining sequence is confirmed.",
    "visible": "The separate component photographs show machined pockets, contoured edges and repeated hole patterns.",
    "inspection": "A common datum alignment makes positions and profiles on different faces comparable. The drawing establishes those relationships; the agreed report identifies which were evaluated.",
    "relatedCapabilities": [
      "5-axis-cnc-machining",
      "cnc-milling-service"
    ]
  },
  {
    "slug": "turning-then-milling-cylindrical-parts",
    "title": "Turning followed by milling",
    "process": "Turning + milling",
    "hero": "turn-mill-operation",
    "photos": [
      "turn-mill-operation",
      "turn-mill-parts"
    ],
    "lead": "A turned bore and shoulder can locate later milled features. See how flats, slots and cross-holes relate to the axis, axial face and angular reference.",
    "workpiece": "The original workshop photograph records a subsequent milling setup. For a new component, its turned bore or diameter and shoulder may provide practical references, while the drawing defines which features actually control assembly.",
    "setup": "A turned part is located for a subsequent milling operation. Review the milled features relative to the turned datum before selecting the holding method and machining sequence.",
    "visible": "The circular parts combine internal bores with machined details around their outer form.",
    "inspection": "The finished interface connects turned and milled features. Its size, position and edge requirements need separate evaluation against the released drawing.",
    "relatedCapabilities": [
      "cnc-turning-service",
      "cnc-milling-service"
    ]
  },
  {
    "slug": "two-stage-cnc-milling",
    "title": "Two milling operations on one part",
    "process": "Sequential milling",
    "hero": "two-stage-first",
    "photos": [
      "two-stage-first",
      "two-stage-second"
    ],
    "lead": "When a part needs repositioning, the next setup must retain its feature relationships. Explore locating surfaces, clamp access and inspection across two operations.",
    "workpiece": "A second orientation opens cutter access to another face. The locating surfaces must still represent the drawing references and leave enough room for support and clamping.",
    "setup": "Where repositioning is required, choose locating faces that retain the required relationships and leave access for clamping.",
    "visible": "The original photographs record milling of the same component. For a new part, the drawing defines the feature relationships; we review the holding orientations and the checks needed after repositioning.",
    "inspection": "Identify common datums and the dimensional relationships that must be retained between setups. Agree inspection points and acceptance records before production.",
    "relatedCapabilities": [
      "cnc-milling-service",
      "5-axis-cnc-machining"
    ]
  },
  {
    "slug": "milling-a-pocketed-enclosure-form",
    "title": "Milling a pocketed enclosure component",
    "process": "CNC milling",
    "hero": "milling-enclosure-operation",
    "photos": [
      "milling-enclosure-operation",
      "milling-enclosure-parts"
    ],
    "lead": "How do pocket depth, corner radii and remaining walls affect enclosure machining? Relate cutter access and support to the lid, bore and mounting interfaces.",
    "workpiece": "The original photograph shows a recessed component beneath the spindle. Enlarging the cavity provides more room for the contents, but leaves less material in the walls. Pocket depth and the surrounding features also limit the available cutter approach.",
    "setup": "The component is held beneath a CNC spindle. Pocket depth, internal corner radii and clamping surfaces determine tool access; these need review against the actual model.",
    "visible": "The machined components combine recessed areas, flat faces and mounting details.",
    "inspection": "Pocket dimensions describe the cavity; bore fits and mounting relationships establish the interfaces. Both matter, but they require different results.",
    "relatedCapabilities": [
      "cnc-milling-service",
      "aluminum-cnc-parts"
    ]
  },
  {
    "slug": "milling-prismatic-components",
    "title": "CNC milling for prismatic multi-feature parts",
    "process": "CNC milling",
    "hero": "multi-feature-milling-operation",
    "photos": [
      "multi-feature-milling-operation",
      "multi-feature-milling-parts"
    ],
    "lead": "Choose functional datums for a block-shaped CNC part. Connect bores, pockets and mounting faces across machining setups and final inspection.",
    "workpiece": "The workshop photograph records a component held for milling. For a similar drawing, the mounting contacts, bore relationships and accessible orientations determine where the setup can locate and support the part.",
    "setup": "The part is held below the spindle to machine the accessible faces. For multiple orientations, we plan the locating datums and setup sequence from the model before quoting.",
    "visible": "Several components share a similar block-shaped form, with machined faces and openings.",
    "inspection": "The bore pattern must relate to the mounting surfaces as well as meet its individual sizes. The final condition and evaluation references make those results useful.",
    "relatedCapabilities": [
      "cnc-milling-service",
      "low-volume-production"
    ]
  },
  {
    "slug": "29-inch-display-housing-cnc-machining",
    "title": "CNC machining a 29-inch display housing",
    "process": "CNC milling",
    "hero": "display-housing-machining",
    "photos": [
      "display-housing-panel",
      "display-housing-machining"
    ],
    "video": "display-housing",
    "lead": "A display housing’s broad faces need support during cutting and measurement. Explore mounting datums, clamp contact and final flatness requirements.",
    "workpiece": "The original workshop image shows the panel across the machine table with its internal face accessible from above. A new enclosure needs its actual dimensions, supported regions and permitted clamp contacts defined before the route can be assessed.",
    "setup": "The panel rests across the machine table beneath the spindle, with access to the internal face from above. For a similar enclosure, we check support points and clamping areas before planning tool reach and the order of operations.",
    "visible": "The panels have internal recesses, machined face patterns and narrow edge features. The paired view compares their two faces, while the workshop video provides a closer look at the overall form.",
    "inspection": "Panel support and surface condition are part of a meaningful flatness result. Mounting-hole positions and mating edges then need evaluation from the drawing references.",
    "relatedCapabilities": [
      "cnc-milling-service",
      "aluminum-cnc-parts"
    ]
  },
  {
    "slug": "custom-plastic-parts-ptfe-pom-pe-acrylic",
    "title": "Plastic part forms: PTFE, POM, PE and acrylic",
    "process": "Plastic part examples",
    "hero": "plastic-acrylic-detail",
    "photos": [],
    "collection": "plastic",
    "lead": "Workshop examples of plastic guide strips and gears, with acrylic components and PTFE parts.",
    "workpiece": "",
    "setup": "",
    "visible": "",
    "inspection": "",
    "relatedCapabilities": [
      "plastic-machined-parts"
    ]
  },
  {
    "slug": "custom-metal-parts-batch-examples",
    "title": "Metal part forms: shafts, fittings and housings",
    "process": "Metal part examples",
    "hero": "metal-aluminum-housings",
    "photos": [],
    "collection": "metal",
    "lead": "Workshop images of turned shafts, threaded fittings and aluminum housings, with a separate tray of small machined parts.",
    "workpiece": "",
    "setup": "",
    "visible": "",
    "inspection": "",
    "relatedCapabilities": [
      "cnc-turning-service",
      "aluminum-cnc-parts",
      "copper-brass-cnc-parts",
      "low-volume-production"
    ]
  }
];

export const caseForCapability=(slug:string)=>engineeringCases.filter(item=>item.relatedCapabilities.includes(slug));
