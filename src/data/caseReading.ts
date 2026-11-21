// Explanatory buying guidance based on cases.ts, studyEditorial.ts and the
// workshop collections. Steps describe a route to review, not verified timings,
// achieved tolerances, material grades or inspection results for pictured parts.
type Point={title:string;text:string};
type Question={question:string;answer:string};
export type CaseReading={
 title:string;focus:string;inspectionFocus:string;partHeading:string;
 partPoints:Point[];steps:Point[];sequenceNote?:string;
 illustration:{stem:string;alt:string;caption:string};technical:Point[];
 questions:Question[];rfq:string[];
};
export const caseReading:Record<string,CaseReading>={
  "five-axis-machining-multi-face-parts": {
    "title": "Five-Axis Machining for Multi-Face CNC Parts",
    "focus": "Access to angled faces and side openings",
    "inspectionFocus": "Feature positions and profiles from common datums",
    "partHeading": "Reach the faces without losing their relationship",
    "partPoints": [
      {
        "title": "What the photographs show",
        "text": "A component held in a rotary setup, plus separate views of machined forms with holes, pockets and contoured edges."
      },
      {
        "title": "What the drawing must establish",
        "text": "Identify the common datums, mating interfaces and the positional relationships needed between different faces."
      }
    ],
    "steps": [
      {
        "title": "Indexed access or a changing tool direction",
        "text": "An angled face with straight holes may be reached at a fixed indexed orientation. A curved feature can need a changing tool direction. Distinguishing the two avoids choosing simultaneous motion merely because a part has several faces."
      },
      {
        "title": "Clearance around the complete setup",
        "text": "A clear cutter line is only part of the approach: the holder, spindle and fixture also need room. A narrow side opening can become inaccessible at a particular tilt even when the tool tip reaches its surface. The complete model and holding envelope make that conflict visible."
      },
      {
        "title": "One reference system across the faces",
        "text": "The common datum scheme relates the features made in different orientations. Measurement access matters alongside cutting access: a reachable machined surface still needs an agreed way to evaluate its position or profile."
      }
    ],
    "sequenceNote": "The photograph shows a rotary setup. Indexed positioning or simultaneous tool motion is selected from the model and machining plan.",
    "illustration": {
      "stem": "/media/cases-reading-20261014/setup-orientations",
      "alt": "Machining block held in two orientations to expose perpendicular faces",
      "caption": "Two holding orientations. the fixture is selected for the actual drawing."
    },
    "technical": [
      {
        "title": "Common datums",
        "text": "Connect features on different faces to a clear datum scheme. Changing orientation must preserve the relationships that control assembly."
      },
      {
        "title": "Tool and fixture clearance",
        "text": "Provide the complete part and mating envelope. Check access to side openings and contours in each planned orientation."
      },
      {
        "title": "Indexed or simultaneous motion",
        "text": "Angled faces may use indexed positioning; continuous contours may need simultaneous motion. Select the tool path from the controlled model and access review."
      }
    ],
    "questions": [
      {
        "question": "Does every multi-face part need simultaneous five-axis machining?",
        "answer": "No. The model, contour and available clearance determine whether indexed positions or simultaneous motion are needed."
      },
      {
        "question": "Can I use these photographs to specify a tolerance?",
        "answer": "Specify limits on your own drawing. The photographs show the setup and geometry; achievable tolerances and the measurement method need review for the part."
      },
      {
        "question": "What should the inspection report cover?",
        "answer": "Identify the critical hole positions, profiles and mounting interfaces, their datums and the results you need recorded. Agree sampling and the report format before production."
      }
    ],
    "rfq": [
      "Current model and controlled drawing revision",
      "Finished and blank dimensions, weight and clamping limits",
      "Common datums, feature positions and surface profiles",
      "Material, condition, finish and quantity",
      "Measurement method, sampling and required reports",
      "Delivery destination and requested date"
    ]
  },
  "turning-then-milling-cylindrical-parts": {
    "title": "Turning Then Milling: Locating Off-Axis CNC Features",
    "focus": "Off-axis features located from the turned body",
    "inspectionFocus": "Diameters, runout and milled-feature positions",
    "partHeading": "The bore locates radially; a face locates axially",
    "partPoints": [
      {
        "title": "What the photographs show",
        "text": "Circular components with bores and additional machined details, together with a subsequent milling setup."
      },
      {
        "title": "What the drawing must establish",
        "text": "Relate the milled holes, slots or flats to the turned axis and the shoulder or face used for axial location."
      }
    ],
    "steps": [
      {
        "title": "Radial and axial location",
        "text": "A bore or outside diameter establishes radial location only when it is the selected locating feature. A shoulder or face establishes the axial reference. Their role in the assembly determines which relationships the later milling operation must retain."
      },
      {
        "title": "Clocking the off-axis features",
        "text": "A flat or cross-hole may also need an angular relationship to another feature. A cylindrical surface alone cannot establish that clocking. A key, existing flat or another defined feature can provide the missing reference where the design requires one."
      },
      {
        "title": "Edges and fits after both operations",
        "text": "The final result includes the intersections between operations. A cross-hole can leave a burr inside a bore, while a later coating can change a sliding fit. Acceptance therefore covers the specified edges and completed surface condition as well as feature size and position."
      }
    ],
    "sequenceNote": "Locate the secondary milling operation from the turned axis and axial face. Review the complete sequence against the drawing.",
    "illustration": {
      "stem": "/media/turning-reading-20261014/turned-features",
      "alt": "Stepped turned part with an axial bore, external thread and cross-hole",
      "caption": "Turned and off-axis features. "
    },
    "technical": [
      {
        "title": "Radial and axial location",
        "text": "A datum axis controls radial relationships; an appropriate shoulder or face establishes axial position. Show both where the assembly depends on them."
      },
      {
        "title": "Angular orientation",
        "text": "Specify the relationship between off-axis holes, slots and flats. A circular diameter alone does not define their angular orientation."
      },
      {
        "title": "Edges after secondary machining",
        "text": "Identify burr-sensitive intersections, threads and sealing or sliding surfaces. Set edge and final-surface acceptance on the drawing."
      }
    ],
    "questions": [
      {
        "question": "Why relate milled features to the turned axis?",
        "answer": "Their positions may control assembly with the bore, diameter or shoulder. The drawing must define those relationships so the second setup and inspection can use consistent datums."
      },
      {
        "question": "Does this study show a live-tooling operation?",
        "answer": "A separate milling operation and live-tooling work on a turning center are different routes. The original photograph records a subsequent milling setup. For a new component, access, workholding and the required feature relationships determine whether either route is suitable."
      },
      {
        "question": "Which dimensions need checking after milling?",
        "answer": "Mark critical diameters, runout and off-axis feature positions, plus edges or surfaces affected by the second operation. Agree the final measurement state and records."
      }
    ],
    "rfq": [
      "Datum axis, diameters and axial dimensions",
      "Location and orientation of off-axis features",
      "Mating parts, thread standards and engagement",
      "Material, stock condition, finish and quantity",
      "Runout, position, edge and inspection requirements",
      "Delivery destination and requested date"
    ]
  },
  "two-stage-cnc-milling": {
    "title": "Two CNC Milling Setups: Datum Transfer and Inspection",
    "focus": "Access to different faces in two orientations",
    "inspectionFocus": "Dimensional relationships retained between setups",
    "partHeading": "Locating a second operation from the first",
    "partPoints": [
      {
        "title": "What the photographs show",
        "text": "Two workshop views from a source collection recording two milling operations on one component. The illustrations explain access rather than reproduce a verified setup sequence."
      },
      {
        "title": "What the drawing must establish",
        "text": "Identify the surfaces established first and the dimensions connecting them to features reached after repositioning."
      }
    ],
    "steps": [
      {
        "title": "Useful locating surfaces in the first operation",
        "text": "A useful first operation creates accessible locating surfaces as well as finished features. For a block with holes on adjacent faces, a stable seating face and an appropriate side locator can give the next orientation a repeatable basis. The actual scheme follows the assembly datums and available stock."
      },
      {
        "title": "Access and support in the next orientation",
        "text": "The second setup needs contact on those locating surfaces without obstructing the next cut. Thin walls, cosmetic faces or a freshly finished pocket may be poor clamp contacts. A different holding method can be sensible when it preserves the references and supports the remaining material."
      },
      {
        "title": "Relationships that connect the operations",
        "text": "Two individually correct feature sizes do not prove that the faces or holes line up after repositioning. The final inspection needs the dimensions and geometric relationships that connect the operations, using the released datums and specified support condition."
      }
    ],
    "illustration": {
      "stem": "/media/cases-reading-20261014/setup-orientations",
      "alt": "Machining block held in two orientations to expose perpendicular faces",
      "caption": "Two holding orientations. the fixture is selected for the actual drawing."
    },
    "technical": [
      {
        "title": "Datum transfer",
        "text": "The second setup needs a defined relationship to the first. Mark the locating faces and the dimensions linking opposite or adjacent surfaces."
      },
      {
        "title": "Clamping and access",
        "text": "Include stock dimensions, clamping restrictions and protected surfaces. Tool reach and jaw contact need review in both orientations."
      },
      {
        "title": "Inspection after repositioning",
        "text": "State which features must be checked together after both operations. First-setup measurements alone may not establish the final relationship."
      }
    ],
    "questions": [
      {
        "question": "Why use two setups?",
        "answer": "A single holding orientation may block access to another face. The illustrations explain two access directions; the new part model determines the required sequence."
      },
      {
        "question": "What is datum transfer?",
        "answer": "It is the relationship between the locating features used in successive setups. Define those features so dimensions remain related after the part is repositioned."
      },
      {
        "question": "How should I specify acceptance across both setups?",
        "answer": "Mark the common datums and dimensions connecting the faces. Agree how those relationships will be measured on the finished part and which results are recorded."
      }
    ],
    "rfq": [
      "Model, drawing and approved revision",
      "Stock dimensions and any clamping restrictions",
      "Functional datums and critical relationships between faces",
      "Material, finish, quantity and protected surfaces",
      "Required measurement points, sampling and reports"
    ]
  },
  "milling-a-pocketed-enclosure-form": {
    "title": "Milling a Pocketed Enclosure: Depth, Walls and Fit",
    "focus": "Pocket depth, walls and mounting interfaces",
    "inspectionFocus": "Depth, position, flatness and final interfaces",
    "partHeading": "The cavity must leave a usable enclosure",
    "partPoints": [
      {
        "title": "What the photographs show",
        "text": "A recessed block-like component beneath the spindle and a group of machined enclosure forms."
      },
      {
        "title": "What the drawing must establish",
        "text": "Specify pocket depth, remaining walls, corner radii and mounting interfaces, with the faces used for location."
      }
    ],
    "steps": [
      {
        "title": "Corner geometry and tool reach",
        "text": "A round cutter leaves a radius in an internal corner. A mating insert that requires a sharp corner can therefore change the manufacturing route. Where the assembly allows it, a larger radius or local relief may give a shorter, more stable tool access to the pocket."
      },
      {
        "title": "Wall support and mounting references",
        "text": "The cavity, central bore and mounting pattern need references to the faces that locate the enclosure in use. Holding the part must leave those features reachable while supporting the walls that remain after material removal."
      },
      {
        "title": "Lid fit in the final condition",
        "text": "A lid fit depends on the completed mating land and mounting relationships. If a seal is required, its surface and acceptance criteria need definition; the visible recess does not establish sealing performance. Surface treatment also needs to be reflected in the final dimensions."
      }
    ],
    "illustration": {
      "stem": "/media/services-reading-20261014/milling-features",
      "alt": "Machined block showing pockets, internal radii, holes and a side bore",
      "caption": "Typical milled geometry. "
    },
    "technical": [
      {
        "title": "Pocket depth and corner radius",
        "text": "State the required internal geometry and any permitted radius changes. Deeper pockets and restricted corners affect tool access."
      },
      {
        "title": "Remaining wall sections",
        "text": "Show minimum wall thickness and protected areas. Review how the part will be supported while cavities and interfaces are machined."
      },
      {
        "title": "Mating and sealing surfaces",
        "text": "Locate holes and bores from mounting datums. Mark seal lands, cosmetic faces and dimensions that apply after treatment."
      }
    ],
    "questions": [
      {
        "question": "Can the internal corners be made exactly as shown in my model?",
        "answer": "Provide the required radii and permitted changes. The tool access and internal corner geometry need review before the machining route is confirmed."
      },
      {
        "question": "Which dimensions apply after finishing?",
        "answer": "Identify the finish, protected fits and final dimensions explicitly. Agree whether depth, bore and mating-surface checks occur before or after treatment."
      },
      {
        "question": "Does the enclosure form establish leak performance?",
        "answer": "Leak testing needs its own procedure and acceptance limits. The photographs and dimensional checks do not by themselves establish sealing performance."
      }
    ],
    "rfq": [
      "Model, pocket depths and internal radii",
      "Wall thickness, stock and clamping faces",
      "Datum faces, hole positions and mating interfaces",
      "Material, finish, masking and quantity",
      "Inspection and separate sealing-test requirements",
      "Delivery destination and requested date"
    ]
  },
  "milling-prismatic-components": {
    "title": "CNC Milling Prismatic Parts: Faces, Bores and Pockets",
    "focus": "Faces, bores, pockets and repeated forms",
    "inspectionFocus": "Relative positions, flatness and batch sampling",
    "partHeading": "Start with the surfaces that locate the block",
    "partPoints": [
      {
        "title": "What the photographs show",
        "text": "Block-shaped components with machined faces and openings, plus the component held beneath a milling spindle."
      },
      {
        "title": "What the drawing must establish",
        "text": "Use the mounting faces as datums for the holes and pockets. Define the relative positions needed for assembly."
      }
    ],
    "steps": [
      {
        "title": "The assembly explains the datum choice",
        "text": "If the block seats on a base and locates against a side, those contacts explain why the bore pattern needs a relationship to those faces. A different assembly locator calls for a different scheme, even when the outside shape looks similar."
      },
      {
        "title": "Access on each face",
        "text": "Features on the opposite face may require another orientation. An accessible locating face helps transfer the references; a clamp across a thin pocket wall can change the supported shape. The full model exposes those access and support decisions."
      },
      {
        "title": "A repeatable definition for the batch",
        "text": "Repeated parts need the same released definition, but a batch photograph cannot establish dimensional consistency. The order’s inspection plan defines critical relationships, sampling and the records that will demonstrate acceptance."
      }
    ],
    "illustration": {
      "stem": "/media/services-reading-20261014/milling-features",
      "alt": "Machined block showing pockets, internal radii, holes and a side bore",
      "caption": "Typical milled geometry. "
    },
    "technical": [
      {
        "title": "Bores and hole patterns",
        "text": "Give sizes, fits and locations from the common datums. Avoid leaving the relationship between holes and mounting faces to interpretation."
      },
      {
        "title": "Faces and pockets",
        "text": "Specify flatness, pocket depth and the surfaces that contact mating parts. Identify dimensions affected by treatment."
      },
      {
        "title": "Repeat parts and revisions",
        "text": "The photograph shows several forms. Define part numbers, drawing revisions, quantities and sampling for the actual order."
      }
    ],
    "questions": [
      {
        "question": "Which surfaces should be used as datums?",
        "answer": "Identify the mounting or functional faces that locate the part in its assembly. Relate bores, pockets and hole patterns to those drawing datums."
      },
      {
        "question": "Does a batch photograph establish dimensional consistency?",
        "answer": "The photograph shows part forms. Consistency is assessed using agreed measurements, sampling and records for the order."
      },
      {
        "question": "What changes if the part needs another orientation?",
        "answer": "Define the feature relationships across setups and review the locating method. The inspection plan should check the final relationships after repositioning."
      }
    ],
    "rfq": [
      "Controlled drawing and model revision",
      "Mounting datums, bores and hole patterns",
      "Pocket depths and feature relationships",
      "Material, finish and post-treatment dimensions",
      "Part numbers, quantities and sampling plan",
      "Inspection method, reports and delivery destination"
    ]
  },
  "29-inch-display-housing-cnc-machining": {
    "title": "29-Inch Display Housing: CNC Support and Flatness",
    "focus": "Broad panels, recessed faces and narrow edges",
    "inspectionFocus": "Flatness, mounting positions and cosmetic faces",
    "partHeading": "Support matters across the whole panel",
    "partPoints": [
      {
        "title": "What the photographs show",
        "text": "Broad housing panels with slots, mounting features and recessed faces. The paired photograph compares their internal and external faces."
      },
      {
        "title": "What the drawing must establish",
        "text": "Specify the actual enclosure dimensions, wall sections, mounting datums and mating edges. The 29-inch display designation is separate from the enclosure dimensions."
      }
    ],
    "steps": [
      {
        "title": "Supporting the broad section",
        "text": "Support beneath a broad section reduces unsupported spans during cutting. Clamp contact also has to protect the visible face and fitted edges. A contact area that is convenient for holding may be unsuitable for the finished appearance."
      },
      {
        "title": "Reach and material removal",
        "text": "Recesses and edge details need cutter access across the supported panel. Removing material changes the section left to resist movement, so operation order and support need to be considered together for the actual housing."
      },
      {
        "title": "Measuring the condition the assembly needs",
        "text": "Flatness needs a stated condition: a free panel and one restrained at its mounting points answer different questions. The required condition, support and mating-edge relationships belong beside the mounting-hole and slot requirements."
      }
    ],
    "illustration": {
      "stem": "/media/cases-reading-20261014/panel-support",
      "alt": "Shallow enclosure panel with support pads and clamps at its outer flange",
      "caption": "Panel support and clamping areas."
    },
    "technical": [
      {
        "title": "Support and clamping areas",
        "text": "Show areas that may contact the fixture and surfaces that must remain protected. Review support under broad or thin sections."
      },
      {
        "title": "Panel flatness and measurement support",
        "text": "Specify flatness and the condition in which it is measured. Agree the support arrangement used for the acceptance check."
      },
      {
        "title": "Edges, slots and finish",
        "text": "Locate narrow edge details from mounting datums. Mark visible faces, finish requirements and dimensions that apply after treatment."
      }
    ],
    "questions": [
      {
        "question": "Does 29 inches describe the enclosure dimensions?",
        "answer": "No. The source identifies a housing for a 29-inch display. The actual enclosure dimensions and machining envelope must be specified separately."
      },
      {
        "question": "How should panel flatness be checked?",
        "answer": "Define the flatness requirement and agree the measurement support and condition. Include the mounting datums and any post-treatment acceptance requirements."
      },
      {
        "question": "Can the workshop video replace the inspection report?",
        "answer": "The video provides a closer view of the form and setup. Request dimensional, cosmetic and any functional-test records separately for your order."
      }
    ],
    "rfq": [
      "Actual enclosure dimensions and model revision",
      "Wall thickness, support and clamping restrictions",
      "Mounting datums, hole positions and edge relationships",
      "Cosmetic faces, finish, masking and quantity",
      "Flatness method, measurement support and reports",
      "Delivery destination and requested date"
    ]
  },
  "custom-plastic-parts-ptfe-pom-pe-acrylic": {
    "title": "Machined Plastic Parts: PTFE, POM, PE and Acrylic",
    "focus": "Polymer forms, fits and working surfaces",
    "inspectionFocus": "Material grade, measurement state and appearance",
    "partHeading": "Explore the original part families",
    "partPoints": [
      {
        "title": "What the collection shows",
        "text": "Workshop photographs show separate PTFE, POM, PE and acrylic part forms."
      },
      {
        "title": "What a new order needs",
        "text": "An exact polymer grade, application conditions, drawing dimensions and acceptance requirements for each part."
      }
    ],
    "steps": [
      {
        "title": "Specify the polymer and conditions",
        "text": "Give the grade, fillers and stock condition, together with loads, temperature, moisture or chemical exposure relevant to the part."
      },
      {
        "title": "Review the machining route",
        "text": "Use the drawing to decide which features need turning or milling, where the tool needs access and how to support thin or flexible sections."
      },
      {
        "title": "Agree the measurement state",
        "text": "Set dimensional, edge and appearance acceptance under the agreed conditions. Define any functional documentation or testing separately."
      }
    ],
    "sequenceNote": "Plan the route and acceptance requirements for each part number and polymer grade.",
    "illustration": {
      "stem": "/media/collection-covers/plastic-collection-illustrative-v1",
      "alt": "Polymer gear, bushings, guide strips and transparent circular forms",
      "caption": "Polymer part families. "
    },
    "technical": [
      {
        "title": "The grade follows the service conditions",
        "text": "A sliding guide and a viewing cover need different material properties. Loads, temperature, moisture and chemical exposure help define the grade; color and the generic polymer name leave important choices unresolved."
      },
      {
        "title": "Flexible sections need a defined support condition",
        "text": "Thin strips and walls can move during machining or measurement. A tight fit is meaningful only when its temperature, conditioning and support are appropriate to the requirement."
      },
      {
        "title": "Appearance and application performance are separate",
        "text": "A clear machined part can have acceptable dimensions while failing an optical requirement. Optical, electrical, food-contact or medical acceptance needs explicit criteria and records; it is not established by the photographed form."
      }
    ],
    "questions": [
      {
        "question": "Are all the photographs from one product or batch?",
        "answer": "The photographs show several part types. Use the closest example as a reference and specify the requirements on your own drawing."
      },
      {
        "question": "Can the polymer be identified from its color?",
        "answer": "No. Follow the source material labels as context, then specify the exact grade for the order. Color alone does not identify polymer properties."
      },
      {
        "question": "How are cosmetic or functional requirements agreed?",
        "answer": "Mark viewing and working surfaces and provide acceptance criteria. Define any optical, electrical or other application testing and documentation separately."
      }
    ],
    "rfq": [
      "Part drawing, revision and mating components",
      "Exact polymer grade, fillers and stock condition",
      "Loads, temperature, moisture and chemical exposure",
      "Critical fits, geometry and cosmetic surfaces",
      "Measurement conditions, tests and required records",
      "Quantity, destination and requested date"
    ]
  },
  "custom-metal-parts-batch-examples": {
    "title": "Machined Metal Parts: Shafts, Fittings and Housings",
    "focus": "Turned interfaces, milled cavities and handling",
    "inspectionFocus": "Fits, threads, final surfaces and records",
    "partHeading": "Explore the original metal part families",
    "partPoints": [
      {
        "title": "What the collection shows",
        "text": "The collection shows turned shafts and fittings, aluminum housings, brass parts and a tray of small machined components."
      },
      {
        "title": "What a new order needs",
        "text": "Part numbers, drawing revisions, exact material grades, finishes and acceptance requirements. The examples do not establish a shared order or a completed inspection."
      }
    ],
    "steps": [
      {
        "title": "Define each part and material",
        "text": "List the grade, condition, geometry and quantity for each part number. Identify components that must fit together."
      },
      {
        "title": "Review turning, milling and finishing",
        "text": "Locate working features from the drawing datums and specify the treatment and protected interfaces. Select the route for each component."
      },
      {
        "title": "Agree acceptance and handling",
        "text": "Set dimensional limits, cleanliness criteria and packing requirements, then agree which checks and records will show that the parts meet them."
      }
    ],
    "sequenceNote": "Plan machining, finishing and inspection for each part number in a mixed order.",
    "illustration": {
      "stem": "/media/turning-reading-20261014/turned-features",
      "alt": "Stepped turned part with an axial bore, external thread and cross-hole",
      "caption": "Turned and off-axis features. "
    },
    "technical": [
      {
        "title": "The working interface identifies the critical features",
        "text": "A shaft fit depends on the mating bore and datum axis. A fitting may depend on its thread and sealing contact; a housing on its lid and mounting pattern. Those functions explain which dimensions need the closest attention."
      },
      {
        "title": "The completed finish can change the interface",
        "text": "An alloy designation and treatment are separate requirements. Plating or anodizing can affect a close fit, so the drawing needs the intended final dimensions and any protected regions for each component."
      },
      {
        "title": "A mixed shipment still needs individual identity",
        "text": "Use part numbers and revisions to match the components to their inspection records. Specify pack quantities, measurable cleanliness limits and the protection needed for finished surfaces."
      }
    ],
    "questions": [
      {
        "question": "Can you supply the exact grade shown in a photograph?",
        "answer": "A photograph does not identify the exact grade. Specify the alloy and condition, then confirm availability and the required records in the quotation."
      },
      {
        "question": "What records confirm cleanliness, inspection or shipment?",
        "answer": "For cleanliness, specify the acceptance criteria and any required cleaning record. Ask for the dimensional report and dispatch documents to be identified by part number or batch."
      },
      {
        "question": "What should a mixed-part batch request include?",
        "answer": "List each part number, revision, material, finish and quantity. Identify mating components and give inspection, cleanliness and packaging requirements."
      }
    ],
    "rfq": [
      "Part numbers, drawings and approved revisions",
      "Material grade, condition and quantity per part",
      "Fits, datum axes, threads and mounting interfaces",
      "Finish, plating and post-treatment dimensions",
      "Inspection, cleanliness, records and packaging",
      "Release schedule, destination and requested date"
    ]
  }
};

export const collectionReading:Record<string,{form:string;material:string;drawing:string;inspection:string}>={
  "ptfe": {
    "form": "These PTFE-related examples include small components with holes and stepped shafts.",
    "material": "The examples are labelled PTFE-related. A new order still needs the exact grade, fillers and stock form for the working part.",
    "drawing": "A sleeve needs its mating diameters and working length; a stepped shaft also needs the relationships between shoulders and axis. Those interfaces explain where dimensional control matters.",
    "inspection": "Flexible surfaces can move under contact force. Mating dimensions and edge acceptance need an agreed measurement condition that suits the part."
  },
  "pom": {
    "form": "The POM reference has gear teeth, a raised hub and a central bore.",
    "material": "A generic POM designation leaves grade and filler choices open. The selected grade needs to suit the gear’s working conditions and mating arrangement.",
    "drawing": "Tooth geometry establishes the mesh; the bore and hub locate that mesh in the mechanism. Their relationship matters alongside the individual dimensions.",
    "inspection": "A bore-fit result does not establish gear-tooth geometry. The agreed scope separates the tooth requirements, mating fit and edge condition."
  },
  "pe": {
    "form": "The PE group shows straight and curved guide-strip forms.",
    "material": "The exact PE grade belongs to the order. A guide’s load, sliding contact and service conditions provide the context for choosing it.",
    "drawing": "Cross-section and path locate the contact surface. Mounting details and permitted support explain how a long or curved strip should fit the assembly.",
    "inspection": "A flexible strip needs a defined condition for profile and fit evaluation. Its sliding surface can also have a separate finish requirement."
  },
  "acrylic": {
    "form": "The acrylic group includes circular rimmed forms and a separate rectangular form with recesses and holes.",
    "material": "The grade and intended appearance need definition. A clear-looking reference does not establish optical quality or suitability for a particular environment.",
    "drawing": "Mounting interfaces control fit, while viewing surfaces need their own cosmetic limits. Handling protection matters where a scratch would make an otherwise correct part unacceptable.",
    "inspection": "Dimensional and visual acceptance answer different questions. Any optical-performance requirement needs a separately defined method and limit."
  },
  "turned-parts": {
    "form": "Shafts and fitting-like forms with shoulders, flanges and threaded sections.",
    "material": "The selected shaft or fitting needs its exact metal grade and condition. A batch photograph cannot establish either.",
    "drawing": "Working diameters relate to the mating fit, while shoulders and threads establish axial location and retention. A common datum axis connects them.",
    "inspection": "Size readings establish fits; runout and thread gauging address different requirements. The drawing and report scope identify which are needed."
  },
  "aluminum-housings": {
    "form": "Rectangular housings with cavities and perimeter mounting holes.",
    "material": "The aluminum alloy, temper and stock form belong to the released definition. The visible cavity does not identify those properties.",
    "drawing": "Pocket depth and remaining walls define usable internal space. Lid contacts, bores and the mounting pattern establish how the housing fits its assembly.",
    "inspection": "Final dimensions need to reflect any treatment affecting the fits. Viewing surfaces can have separate cosmetic acceptance."
  },
  "brass-fittings": {
    "form": "Small fitting-like components grouped in a batch photograph.",
    "material": "The exact brass alloy and standard matter to the fitting. Color alone cannot identify a grade or establish application suitability.",
    "drawing": "A thread connects the parts, while a seat, face or other defined feature may make the seal. The mating connection and any plating need to be part of that definition.",
    "inspection": "Thread and interface results address geometry. Pressure or leak acceptance, when needed, requires its own agreed test; it cannot be inferred from a fitting photograph."
  },
  "batch-handling": {
    "form": "Repeated small metal forms and openings in a blue tray.",
    "material": "The tray image shows small machined components. Specify the alloy grade and any cleaning method the order requires.",
    "drawing": "Part numbers and revisions keep repeated forms identifiable. If cleanliness matters to assembly, a measurable limit gives handling and packing a useful target.",
    "inspection": "If the parts must meet a cleanliness limit, agree the check and record alongside the dimensional acceptance requirements."
  }
};
