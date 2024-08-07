import { type Font } from '../type';

/* Selection of arrow symbols
 * ↖ ← ↑ → ↓ ↖ ↗ ↘ ↙ ↔ ↕ ↰ ↱ ↲ ↳ ↴ ↵ 
 */
export default {
  '→': [
    [
      [0, 0.5],
      [1, 0.5],
    ],
    [
      [0.75, 0.25],
      [1, 0.5],
      [0.75, 0.75]
    ]
  ],
  '←': [
    [
      [0, 0.5],
      [1, 0.5],
    ],
    [
      [0.25, 0.25],
      [0, 0.5],
      [0.25, 0.75]
    ]
  ],
  '↑': [
    [
      [0.5, 0],
      [0.5, 1]
    ],
    [
      [0.25, 0.25],
      [0.5, 0],
      [0.75, 0.25]
    ]
  ],
  '↓': [
    [
      [0.5, 0],
      [0.5, 1]
    ], [
      [0.25, 0.75],
      [0.5, 1],
      [0.75, 0.75]
    ]
  ],
  '↖': [
    [
      [0, 0],
      [1, 1]
    ], [
      [0, 0.33],
      [0, 0],
      [0.33, 0]
    ]
  ],
  '↗': [
    [
      [0, 1],
      [1, 0]
    ], [
      [0.66, 0],
      [1, 0],
      [1, 0.33]
    ]
  ],
  '↘': [
    [
      [0, 0],
      [1, 1]
    ], [
      [1, 0.66],
      [1, 1],
      [0.66, 1]
    ]
  ],
  '↙': [
    [
      [1, 0],
      [0, 1]
    ], [
      [0, 0.66],
      [0, 1],
      [0.33, 1]
    ]
  ],
  '↔': [
    [
      [0, 0.5],
      [1, 0.5]
    ],
    [
      [0.25, 0.25],
      [0, 0.5],
      [0.25, 0.75]
    ],
    [
      [0.75, 0.25],
      [1, 0.5],
      [0.75, 0.75]
    ]
  ],
  '↕': [
    [
      [0.5, 0],
      [0.5, 1]
    ],
    [
      [0.25, 0.25],
      [0.5, 0],
      [0.75, 0.25]
    ],
    [
      [0.25, 0.75],
      [0.5, 1],
      [0.75, 0.75]
    ]
  ],
  '↰': [
    [
      [0, 0.5],
      [0.5, 0.5],
      [0.5, 1]
    ],
    [
      [0.25, 0.25],
      [0, 0.5],
      [0.25, 0.75]
    ]
  ],
  '↱': [
    [
      [1, 0.5],
      [0.5, 0.5],
      [0.5, 1]
    ], [
      [0.75, 0.25],
      [1, 0.5],
      [0.75, 0.75]
    ]
  ],
  '↲': [
    [
      [0.5, 0],
      [0.5, 0.5],
      [0, 0.5]
    ], [
      [0.25, 0.25],
      [0, 0.5],
      [0.25, 0.75]
    ]
  ],
  '↳': [
    [
      [0.5, 0],
      [0.5, 0.5],
      [1, 0.5]
    ], [
      [0.75, 0.25],
      [1, 0.5],
      [0.75, 0.75]
    ]
  ],
  '↴': [
    [
      [0, 0.5],
      [0.5, 0.5],
      [0.5, 1]
    ],[
      [0.25, 0.75],
      [0.5, 1],
      [0.75, 0.75]
    ]
  ],
  '↵': [
    [
      [1, 0],
      [1, 0.5],
      [0, 0.5]
    ], [
      [0.25, 0.25],
      [0, 0.5],
      [0.25, 0.75]
    ]
  ]
} as Font

