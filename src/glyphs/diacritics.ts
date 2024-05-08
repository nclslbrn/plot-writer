import type { Font } from "../type";
/*
 * Create diacritic to create latin extended
 * @url https://en.wikipedia.org/wiki/Latin_Extended_Additional
 */
const diacritics = {
  // grave accent
  gr: [
    [
      [0.45, 0.1],
      [0.55, 0.15],
    ],
  ],
  // acute accent
  ct: [
    [
      [0.45, 0.15],
      [0.55, 0.1],
    ],
  ],
  // circumflex accent
  cr: [
    [
      [0.4, 0.15],
      [0.5, 0.1],
      [0.6, 0.15],
    ],
  ],
  // circumflex below
  crb: [
    [
      [0.4, 0.85],
      [0.5, 0.8],
      [0.6, 0.85],
    ],
  ],
  // diaeresis
  dr: [
    [
      [0.4, 0.1],
      [0.4, 0.125],
    ],
    [
      [0.6, 0.1],
      [0.6, 0.125],
    ],
  ],
  // diaeresis below 
  drb: [
    [
      [0.4, 0.75],
      [0.4, 0.775],
    ],
    [
      [0.6, 0.75],
      [0.6, 0.755],
    ],
  ],

  // tild
  tl: [
    [
      [0.4, 0.15],
      [0.4, 0.1],
      [0.6, 0.15],
      [0.6, 0.1],
    ],
  ],
  // tild bottom
  tlb: [
    [
      [0.4, 0.85],
      [0.4, 0.8],
      [0.6, 0.85],
      [0.6, 0.8],
    ],
  ],
  // breve
  br: [
    [
      [0.4, 0.1],
      [0.4, 0.15],
      [0.6, 0.15],
      [0.6, 0.1],
    ],
  ],
  // breve below
  brb: [
    [
      [0.4, 0.8],
      [0.4, 0.85],
      [0.6, 0.85],
      [0.6, 0.8]
    ]
  ],
  // inverse breve
  bri: [
    [
      [0.4, 0.15],
      [0.4, 0.1],
      [0.6, 0.1],
      [0.6, 0.15],
    ],
  ],
  // half circle right
  hcr: [
    [
      [0.6, 0.1],
      [0.7, 0.1],
      [0.7, 0.2],
      [0.6, 0.2],
    ],
  ],
  // haček
  hc: [
    [
      [0.4, 0.1],
      [0.5, 0.15],
      [0.6, 0.1],
    ],
  ],
  // macron
  mc: [
    [
      [0.3, 0.1],
      [0.7, 0.1],
    ],
  ],
  // angstorm or circle or ring (top)
  gs: [
    [
      [0.45, 0.15],
      [0.45, 0.1],
      [0.55, 0.1],
      [0.55, 0.15],
      [0.45, 0.15],
    ],
  ],
  // cedilla
  cd: [
    [
      [0.5, 0.7],
      [0.5, 0.75],
      [0.55, 0.75],
      [0.55, 0.8],
      [0.45, 0.8],
    ],
  ],
  // cedilla left
  cdl: [
    [
      [0.15, 0.7],
      [0.15, 0.75],
      [0.2, 0.75],
      [0.2, 0.8],
      [0.2, 0.8],
    ],
  ],
  // cedilla right
  cdr: [
    [
      [0.85, 0.7],
      [0.85, 0.75],
      [0.9, 0.75],
      [0.9, 0.8],
      [0.7, 0.8],
    ],
  ],
  // ring/dot below
  db: [
    [
      [0.5, 0.8],
      [0.5, 0.825]
    ],
  ],
  // dot above
  da: [
    [
      [0.5, 0.1],
      [0.5, 0.125]
    ],
  ],
  // hook above
  ha: [
    [
      [0.45, 0.2],
      [0.55, 0.2],
      [0.55, 0.25],
      [0.5, 0.25],
      [0.5, 0.3],
    ],
  ],
  // hook bottom right
  hbr: [
    [
      [0.85, 0.7],
      [0.85, 0.85],
      [0.83, 0.88],
      [0.7, 0.9]
    ]
  ],
  // hook bottom left
  hbl: [
    [
      [0.15, 0.7],
      [0.15, 0.85],
      [0.17, 0.88],
      [0.2, 0.9]
    ]
  ],
  // line below
  lb: [
    [
      [0.3, 0.8],
      [0.7, 0.8],
    ],
  ],
  // horn
  hr: [
    [
      [0.85, 0.4],
      [0.9, 0.35],
      [0.9, 0.2],
    ],
  ],
  // cross (right)
  crs: [
    [
      [0.90, 0.2],
      [0.87, 0.22],
      [0.85, 0.25],
      [0.85, 0.3],
    ] ,
  ],
  // barred (kind of /)
  brd: [
    [
      [0.55, 0.2],
      [0.35, 0.8],
    ],
  ],
  // ogonek 
  gnk: [
    [
      [0.85, 0.7],
      [0.75, 0.75],
      [0.85, 0.8]
    ]
  ],
  // ogonek middle
  gnkc: [
    [
      [0.5, 0.7],
      [0.475, 0.75],
      [0.5, 0.79],
      [0.55, 0.8]
    ]
  ],
  // coma 
  cm: [
    [
      [0.5, 0.75],
      [0.49, 0.79],
      [0.45, 0.8],
    ],
  ],
 } as Font;

export default diacritics;
