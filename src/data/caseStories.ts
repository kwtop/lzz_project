// Public explanations distinguish source photographs from generated geometry.
// No photo or illustration establishes an alloy, tolerance or acceptance result.
type Story = {title:string;summary:string;hero?:string;heroAlt?:string;featureHeading:string;question:string;answer:string;diagram?:{stem:string;alt:string;caption:string};processContext:string};
export const caseStories:Record<string,Story>={
  "turning-then-milling-cylindrical-parts": {
    "title": "Turning Then Milling: Locating Off-Axis CNC Features",
    "summary": "A turned bore and shoulder can locate later milled features. See how flats, slots and cross-holes relate to the axis, axial face and angular reference.",
    "hero": "/media/case-stories-20261014/turn-mill-form",
    "heroAlt": "Circular flange with a stepped central bore, mounting holes and milled perimeter cutouts",
    "featureHeading": "The bore locates radially; a face locates axially",
    "question": "Why does a cylindrical part need milling after turning?",
    "answer": "Turning forms rotational surfaces such as bores and shoulders. A flat, slot or cross-hole adds geometry away from that axis. A subsequent milling setup can provide access, provided its locating scheme retains the required relationship to the turned features.",
    "diagram": {
      "stem": "/media/case-stories-20261014/turn-mill-datums",
      "alt": "Flange with a blue bore, dashed center axis and amber locating face",
      "caption": "Blue: bore and axis. Amber: axial face. The drawing supplies the actual datum scheme."
    },
    "processContext": "The original workshop photograph shows a subsequent milling setup. It gives context for tool access and workholding; the sequence above describes what to review for a new drawing."
  },
  "five-axis-machining-multi-face-parts": {
    "title": "Five-Axis Machining for Multi-Face CNC Parts",
    "summary": "When do holes and contours on several faces need five-axis access? See how common datums, cutter clearance and workholding influence the route for a new part.",
    "hero": "/media/case-stories-20261014/multi-face-form",
    "heroAlt": "Multi-face machined block with top holes and curved side openings",
    "featureHeading": "Reach the faces without losing their relationship",
    "question": "Do features on several faces require simultaneous five-axis machining?",
    "answer": "Often, an indexed orientation gives a straight cutter approach to an angled face. Simultaneous movement becomes relevant when the surface or access path requires changing tool orientation during the cut. The model and fixture clearance determine the choice.",
    "processContext": "The workshop image shows access around a rotary assembly. It does not establish whether every feature used simultaneous five-axis motion."
  },
  "two-stage-cnc-milling": {
    "title": "Two CNC Milling Setups: Datum Transfer and Inspection",
    "summary": "When a part needs repositioning, the next setup must retain its feature relationships. Explore locating surfaces, clamp access and inspection across two operations.",
    "hero": "/media/case-stories-20261014/two-setup-form",
    "heroAlt": "Compact machined block with a top recess and features on a perpendicular face",
    "featureHeading": "Locating a second operation from the first",
    "question": "When is a second milling setup a sensible choice?",
    "answer": "A second setup is useful when a clamp or machine orientation blocks a required face. Suitable locating surfaces let the new orientation retain the drawing relationships. A critical feature spanning both setups needs evaluation against the same functional references.",
    "diagram": {
      "stem": "/media/cases-reading-20261014/setup-orientations",
      "alt": "Machining block held in two orientations to expose perpendicular faces",
      "caption": "Two holding orientations; the actual fixture follows the drawing."
    },
    "processContext": "For a similar part, mark the functional datums, critical relationships and any surfaces that must not be clamped. We review locating surfaces and tool access for the proposed machining sequence."
  },
  "milling-a-pocketed-enclosure-form": {
    "title": "Milling a Pocketed Enclosure: Depth, Walls and Fit",
    "summary": "How do pocket depth, corner radii and remaining walls affect enclosure machining? Relate cutter access and support to the lid, bore and mounting interfaces.",
    "hero": "/media/case-stories-20261014/pocket-form",
    "heroAlt": "Square component with a stepped circular pocket, central bore and corner mounting holes",
    "featureHeading": "The cavity must leave a usable enclosure",
    "question": "Which pocket details make an enclosure difficult to machine?",
    "answer": "Deep narrow regions restrict the available cutter and holder, while thin remaining walls need support. A larger internal radius can improve access when the mating component permits it. The cavity outline alone does not establish a practical route.",
    "processContext": "The original photograph shows the component under the spindle. Use it to understand the machining context; the wall thickness, pocket depth and exact material come from the new drawing."
  },
  "milling-prismatic-components": {
    "title": "CNC Milling Prismatic Parts: Faces, Bores and Pockets",
    "summary": "Choose functional datums for a block-shaped CNC part. Connect bores, pockets and mounting faces across machining setups and final inspection.",
    "hero": "/media/case-stories-20261014/prismatic-form",
    "heroAlt": "Elongated prismatic component with a row of bores and a recessed end pocket",
    "featureHeading": "Start with the surfaces that locate the block",
    "question": "Which references should control a block-shaped part with several bores?",
    "answer": "The surfaces that locate the part in its assembly provide the starting point. A bore spacing that looks correct in isolation may still put the whole pattern in the wrong place relative to the mounting face.",
    "processContext": "The workshop photograph records the part held for milling. The separate batch photograph helps identify the form; sampling and dimensional consistency require order-specific measurement records."
  },
  "29-inch-display-housing-cnc-machining": {
    "title": "29-Inch Display Housing: CNC Support and Flatness",
    "summary": "A display housing’s broad faces need support during cutting and measurement. Explore mounting datums, clamp contact and final flatness requirements.",
    "featureHeading": "Support matters across the whole panel",
    "question": "Does a 29-inch display designation define the enclosure machining size?",
    "answer": "It describes the intended display size in the source materials. The housing dimensions, wall sections and machining envelope need their own drawing definition. They cannot be calculated from the display designation alone.",
    "diagram": {
      "stem": "/media/cases-reading-20261014/panel-support",
      "alt": "Shallow enclosure panel with support pads and clamps on its outer flange",
      "caption": "Panel support and clamping areas."
    },
    "processContext": "The original workshop image shows the broad panel supported across the machine table. The video and paired face photograph provide additional views of the form."
  },
  "custom-plastic-parts-ptfe-pom-pe-acrylic": {
    "title": "Machined Plastic Parts: PTFE, POM, PE and Acrylic",
    "summary": "Explore separate PTFE, POM, PE and acrylic part examples. Connect the material grade, fit, support and measurement condition to a new plastic-part order.",
    "featureHeading": "Explore the original part families",
    "question": "Can I choose a machined polymer from the appearance of a sample?",
    "answer": "Appearance can help identify the form you mean, but it cannot establish a polymer grade, filler or application suitability. The order needs a material designation and the conditions relevant to its fit and function.",
    "processContext": "Plan the route and acceptance requirements for each part number and polymer grade."
  },
  "custom-metal-parts-batch-examples": {
    "title": "Machined Metal Parts: Shafts, Fittings and Housings",
    "summary": "Compare shaft, fitting and housing examples by their working interfaces. See how grade, threads, finish and part identity shape a mixed CNC-parts order.",
    "featureHeading": "Explore the original metal part families",
    "question": "What changes when I order several different machined metal parts?",
    "answer": "Each part number needs its own revision, quantity, material and acceptance definition. Shared packaging or a single purchase order does not make different components interchangeable or give them the same inspection scope.",
    "processContext": "Plan machining, finishing and inspection for each part number in a mixed order."
  }
};
