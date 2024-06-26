import { type Font } from '../../type';

/*
 * Associate diacritics with existing uppercase glyph
 *
 * Each key is used to define a diacritical glyph.
 * The first element represent the base glypĥ and the
 * last element of the array is an array of diacritics
 * (key of {@link https://github.com/nclslbrn/plot-writer/blob/main/src/font/diacritics/glyphs.ts})
 * to merge with the letter to compose the glyph
 */

const base = {
  A: [
    [
      [0.85, 0.7],
      [0.85, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
    ],
    [
      [0.15, 0.557],
      [0.85, 0.557],
    ],
  ],
  Æ: [
    [
      [0.5, 0.7],
      [0.5, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
    ],
    [
      [0.15, 0.557],
      [0.6, 0.557],
    ],
    [
      [0.85, 0.271],
      [0.5, 0.271],
      [0.5, 0.7],
      [0.85, 0.7],
    ],
  ],

  B: [
    [
      [0.6, 0.45],
      [0.6, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
      [0.85, 0.45],
      [0.15, 0.45],
    ],
  ],
  Ƀ: [
    [
      [0.6, 0.45],
      [0.6, 0.271],
      [0.25, 0.271],
      [0.25, 0.7],
      [0.85, 0.7],
      [0.85, 0.45],
      [0.25, 0.45],
    ],
    [
      [0.15, 0.58],
      [0.35, 0.58],
    ],
  ],
  Ɓ: [
    [
      [0.6, 0.45],
      [0.6, 0.271],
      [0.25, 0.271],
      [0.25, 0.7],
      [0.85, 0.7],
      [0.85, 0.45],
      [0.25, 0.45],
    ],
    [
      [0.3, 0.271],
      [0.15, 0.271],
      [0.15, 0.414],
    ],
  ],
  Ƃ: [
    [
      [0.6, 0.271],
      [0.25, 0.271],
      [0.25, 0.7],
      [0.85, 0.7],
      [0.85, 0.45],
      [0.25, 0.45],
    ],
  ],
  C: [
    [
      [0.85, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
    ],
  ],
  Ƈ: [
    [
      [0.85, 0.15],
      [0.83, 0.15],
      [0.8, 0.18],
      [0.8, 0.271],
      [0.2, 0.271],
      [0.2, 0.7],
      [0.8, 0.7],
    ],
  ],

  D: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
      [0.85, 0.7],
      [0.15, 0.7],
    ],
    [
      [0.3, 0.271],
      [0.3, 0.7],
    ],
  ],
  Đ: [
    [
      [0.25, 0.271],
      [0.85, 0.271],
      [0.85, 0.7],
      [0.25, 0.7],
    ],
    [
      [0.3, 0.271],
      [0.3, 0.7],
    ],
    [
      [0.2, 0.521],
      [0.4, 0.521],
    ],
  ],
  Ǳ: [
    [
      [0.15, 0.271],
      [0.45, 0.271],
      [0.45, 0.7],
      [0.15, 0.7],
    ],
    [
      [0.2, 0.271],
      [0.2, 0.7],
    ],
    [
      [0.55, 0.271],
      [0.85, 0.271],
      [0.55, 0.7],
      [0.85, 0.7],
    ],
  ],
  Ɗ: [
    [
      [0.15, 0.414],
      [0.15, 0.271],
      [0.85, 0.271],
      [0.85, 0.7],
      [0.25, 0.7],
    ],
    [
      [0.3, 0.271],
      [0.3, 0.7],
    ],
  ],
  Ƌ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
      [0.85, 0.718],
    ],
    [
      [0.85, 0.7],
      [0.15, 0.7],
      [0.15, 0.414],
      [0.85, 0.414],
    ],
  ],

  E: [
    [
      [0.85, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
    ],
    [
      [0.15, 0.557],
      [0.55, 0.557],
    ],
  ],
  Ǝ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
      [0.85, 0.7],
      [0.15, 0.7],
    ],
    [
      [0.85, 0.557],
      [0.45, 0.557],
    ],
  ],
  Ə: [
    [
      [0.85, 0.429],
      [0.15, 0.429],
      [0.15, 0.7],
      [0.85, 0.7],
      [0.85, 0.271],
      [0.15, 0.271],
    ],
  ],
  Ɛ: [
    [
      [0.85, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
    ],
    [
      [0.5, 0.4],
      [0.15, 0.4],
    ],
  ],

  F: [
    [
      [0.85, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
    ],
    [
      [0.15, 0.557],
      [0.55, 0.557],
    ],
  ],
  Ƒ: [
    [
      [0.25, 0.789],
      [0.3, 0.836],
      [0.325, 0.843],
      [0.35, 0.836],
      [0.4, 0.789],
      [0.4, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.15, 0.557],
      [0.55, 0.557],
    ],
  ],

  G: [
    [
      [0.85, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
      [0.85, 0.557],
      [0.5, 0.557],
    ],
  ],
  Ǥ: [
    [
      [0.75, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
      [0.75, 0.7],
      [0.75, 0.557],
      [0.45, 0.557],
    ],
    [
      [0.55, 0.63],
      [0.85, 0.63],
    ],
  ],
  Ɠ: [
    [
      [0.85, 0.15],
      [0.83, 0.15],
      [0.8, 0.18],
      [0.8, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
      [0.85, 0.557],
      [0.5, 0.557],
    ],
  ],
  Ɣ: [
    [
      [0.2995, 0.271],
      [0.5655, 0.6954],
      [0.499, 0.7433],
      [0.4325, 0.6954],
      [0.6985, 0.271],
    ],
  ],
  Ƣ: [
    [
      [0.45, 0.371],
      [0.45, 0.7],
      [0.15, 0.7],
      [0.15, 0.371],
      [0.45, 0.371],
      [0.65, 0.271],
      [0.85, 0.371],
      [0.85, 0.7],
    ],
  ],

  H: [
    [
      [0.15, 0.271],
      [0.15, 0.7],
    ],
    [
      [0.15, 0.557],
      [0.85, 0.557],
    ],
    [
      [0.85, 0.271],
      [0.85, 0.7],
    ],
  ],
  Ħ: [
    [
      [0.2, 0.271],
      [0.2, 0.7],
    ],
    [
      [0.15, 0.4],
      [0.85, 0.4],
    ],
    [
      [0.2, 0.557],
      [0.8, 0.557],
    ],
    [
      [0.8, 0.271],
      [0.8, 0.7],
    ],
  ],
  Ƕ: [
    [
      [0.15, 0.271],
      [0.15, 0.7],
    ],
    [
      [0.15, 0.557],
      [0.5, 0.557],
    ],
    [
      [0.85, 0.45],
      [0.85, 0.65],
      [0.675, 0.7],
      [0.5, 0.65],
      [0.5, 0.271],
    ],
  ],

  I: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.15, 0.7],
      [0.85, 0.7],
    ],
    [
      [0.5, 0.271],
      [0.5, 0.7],
    ],
  ],
  Ĳ: [
    [
      [0.15, 0.271],
      [0.45, 0.271],
    ],
    [
      [0.15, 0.7],
      [0.45, 0.7],
    ],
    [
      [0.275, 0.271],
      [0.275, 0.7],
    ],
    [
      [0.55, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.75, 0.271],
      [0.75, 0.7],
      [0.55, 0.7],
      [0.55, 0.629],
    ],
  ],
  Ɨ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.15, 0.7],
      [0.85, 0.7],
    ],
    [
      [0.15, 0.5],
      [0.85, 0.5],
    ],
    [
      [0.5, 0.271],
      [0.5, 0.7],
    ],
  ],
  Ɩ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.5, 0.271],
      [0.5, 0.7],
      [0.85, 0.7],
    ],
  ],
  J: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.5, 0.271],
      [0.5, 0.7],
      [0.15, 0.7],
      [0.15, 0.629],
    ],
  ],
  Ɉ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.5, 0.271],
      [0.5, 0.7],
      [0.15, 0.7],
      [0.15, 0.629],
    ],
    [
      [0.15, 0.5],
      [0.85, 0.5],
    ],
  ],

  K: [
    [
      [0.15, 0.271],
      [0.15, 0.7],
    ],
    [
      [0.85, 0.271],
      [0.15, 0.557],
      [0.85, 0.7],
    ],
  ],
  Ƙ: [
    [
      [0.15, 0.271],
      [0.15, 0.7],
    ],
    [
      [0.85, 0.271],
      [0.65, 0.271],
      [0.15, 0.557],
      [0.85, 0.7],
    ],
  ],

  L: [
    [
      [0.15, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
    ],
  ],
  Ǉ: [
    [
      [0.15, 0.271],
      [0.15, 0.7],
      [0.45, 0.7],
    ],
    [
      [0.55, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.75, 0.271],
      [0.75, 0.7],
      [0.55, 0.7],
      [0.55, 0.629],
    ],
  ],
  Ỻ: [
    [
      [0.35, 0.271],
      [0.35, 0.7],
      [0.85, 0.7],
    ],
    [
      [0.15, 0.271],
      [0.15, 0.7],
    ],
  ],
  Ƚ: [
    [
      [0.25, 0.271],
      [0.25, 0.7],
      [0.85, 0.7],
    ],
    [
      [0.15, 0.5],
      [0.55, 0.5],
    ],
  ],

  M: [
    [
      [0.15, 0.7],
      [0.15, 0.271],
      [0.5, 0.557],
      [0.85, 0.271],
      [0.85, 0.7],
    ],
  ],

  N: [
    [
      [0.15, 0.7],
      [0.15, 0.271],
      [0.85, 0.7],
      [0.85, 0.271],
    ],
  ],
  Ǌ: [
    [
      [0.15, 0.7],
      [0.15, 0.271],
      [0.45, 0.7],
      [0.45, 0.271],
    ],
    [
      [0.75, 0.271],
      [0.75, 0.7],
      [0.55, 0.7],
      [0.55, 0.629],
    ],
  ],
  Ɲ: [
    [
      [0.15, 0.9],
      [0.17, 0.9],
      [0.22, 0.88],
      [0.25, 0.85],
      [0.25, 0.271],
      [0.85, 0.7],
      [0.85, 0.271],
    ],
  ],
  Ƞ: [
    [
      [0.15, 0.271],
      [0.15, 0.7],
    ],
    [
      [0.15, 0.3],
      [0.85, 0.3],
      [0.85, 0.9],
    ],
  ],

  O: [
    [
      [0.15, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
      [0.85, 0.271],
      [0.15, 0.271],
    ],
  ],
  Œ: [
    [
      [0.15, 0.7],
      [0.5, 0.7],
      [0.5, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
    ],
    [
      [0.5, 0.557],
      [0.65, 0.557],
    ],
    [
      [0.85, 0.271],
      [0.5, 0.271],
      [0.5, 0.7],
      [0.85, 0.7],
    ],
  ],
  Ɔ: [
    [
      [0.15, 0.7],
      [0.85, 0.7],
      [0.85, 0.271],
      [0.15, 0.271],
    ],
  ],
  Ɵ: [
    [
      [0.25, 0.271],
      [0.25, 0.7],
      [0.75, 0.7],
      [0.75, 0.271],
      [0.25, 0.271],
    ],
    [
      [0.15, 0.5],
      [0.85, 0.5],
    ],
  ],
  Ȣ: [
    [
      [0.15, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
      [0.85, 0.271],
    ],
    [
      [0.15, 0.5],
      [0.85, 0.5],
    ],
  ],

  P: [
    [
      [0.15, 0.557],
      [0.85, 0.557],
      [0.85, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
    ],
  ],
  Ƥ: [
    [
      [0.35, 0.557],
      [0.85, 0.557],
      [0.85, 0.271],
      [0.35, 0.271],
      [0.35, 0.7],
    ],
    [
      [0.35, 0.271],
      [0.2, 0.271],
      [0.17, 0.3],
      [0.15, 0.35],
    ],
  ],

  Q: [
    [
      [0.15, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
      [0.85, 0.271],
      [0.15, 0.271],
    ],
    [
      [0.6, 0.629],
      [0.95, 0.736],
    ],
  ],
  Ɋ: [
    [
      [0.75, 0.3],
      [0.15, 0.3],
      [0.15, 0.7],
      [0.75, 0.7],
    ],
    [
      [0.75, 0.271],
      [0.75, 0.8],
      [0.77, 0.85],
      [0.85, 0.9],
    ],
  ],

  R: [
    [
      [0.15, 0.557],
      [0.85, 0.557],
      [0.85, 0.271],
      [0.15, 0.271],
      [0.15, 0.7],
    ],
    [
      [0.15, 0.557],
      [0.85, 0.7],
    ],
  ],
  Ʀ: [
    [
      [0.15, 0.351],
      [0.85, 0.351],
      [0.85, 0.637],
      [0.15, 0.637],
      [0.85, 0.78],
    ],
    [
      [0.15, 0.271],
      [0.15, 0.7],
    ],
  ],
  Ɍ: [
    [
      [0.3, 0.557],
      [0.85, 0.557],
      [0.85, 0.271],
      [0.3, 0.271],
      [0.3, 0.7],
    ],
    [
      [0.15, 0.557],
      [0.3, 0.557],
      [0.85, 0.7],
    ],
  ],

  S: [
    [
      [0.85, 0.271],
      [0.15, 0.271],
      [0.15, 0.557],
      [0.85, 0.557],
      [0.85, 0.7],
      [0.15, 0.7],
    ],
  ],
  ẞ: [
    [
      [0.15, 0.7],
      [0.15, 0.271],
      [0.65, 0.271],
      [0.65, 0.45],
      [0.35, 0.45],
      [0.35, 0.5],
      [0.85, 0.5],
      [0.85, 0.7],
      [0.35, 0.7],
    ],
  ],
  Ʃ: [
    [
      [0.8, 0.271],
      [0.2, 0.271],
      [0.5, 0.5],
      [0.2, 0.7],
      [0.8, 0.7],
    ],
  ],

  T: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.5, 0.271],
      [0.5, 0.7],
    ],
  ],
  Ŧ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.25, 0.5],
      [0.75, 0.5],
    ],
    [
      [0.5, 0.271],
      [0.5, 0.7],
    ],
  ],
  Ƭ: [
    [
      [0.15, 0.35],
      [0.18, 0.3],
      [0.25, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.5, 0.271],
      [0.5, 0.7],
    ],
  ],
  Ʈ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.5, 0.271],
      [0.5, 0.8],
      [0.52, 0.85],
      [0.6, 0.9],
    ],
  ],

  U: [
    [
      [0.15, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
      [0.85, 0.271],
    ],
  ],
  Ʉ: [
    [
      [0.25, 0.271],
      [0.25, 0.7],
      [0.75, 0.7],
      [0.75, 0.271],
    ],
    [
      [0.15, 0.5],
      [0.85, 0.5],
    ],
  ],
  Ɯ: [
    [
      [0.25, 0.271],
      [0.25, 0.7],
      [0.75, 0.7],
      [0.75, 0.271],
    ],
    [
      [0.5, 0.271],
      [0.5, 0.7],
    ],
  ],
  Ʊ: [
    [
      [0.15, 0.271],
      [0.35, 0.271],
      [0.25, 0.7],
      [0.75, 0.7],
      [0.65, 0.271],
      [0.85, 0.271],
    ],
  ],

  V: [
    [
      [0.15, 0.271],
      [0.5, 0.7],
      [0.85, 0.271],
    ],
  ],
  Ʋ: [
    [
      [0.15, 0.271],
      [0.5, 0.7],
      [0.85, 0.271],
      [0.65, 0.271],
    ],
  ],
  Ỽ: [
    [
      [0.15, 0.271],
      [0.5, 0.7],
      [0.75, 0.454],
    ],
  ],
  Ʌ: [
    [
      [0.15, 0.7],
      [0.5, 0.271],
      [0.85, 0.7],
    ],
  ],

  W: [
    [
      [0.15, 0.271],
      [0.3, 0.7],
      [0.5, 0.557],
      [0.7, 0.7],
      [0.85, 0.271],
    ],
  ],

  X: [
    [
      [0.15, 0.271],
      [0.85, 0.7],
    ],
    [
      [0.15, 0.7],
      [0.85, 0.271],
    ],
  ],

  Y: [
    [
      [0.15, 0.271],
      [0.5, 0.557],
      [0.85, 0.271],
    ],
    [
      [0.5, 0.557],
      [0.5, 0.7],
    ],
  ],
  Ɏ: [
    [
      [0.15, 0.271],
      [0.5, 0.557],
      [0.85, 0.271],
    ],
    [
      [0.15, 0.35],
      [0.85, 0.35],
    ],
    [
      [0.5, 0.557],
      [0.5, 0.7],
    ],
  ],
  Ƴ: [
    [
      [0.15, 0.271],
      [0.5, 0.557],
      [0.7, 0.3],
      [0.75, 0.28],
      [0.81, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.5, 0.557],
      [0.5, 0.7],
    ],
  ],
  Ỿ: [
    [
      [0.15, 0.271],
      [0.15, 0.7],
      [0.775, 0.7],
    ],
    [
      [0.75, 0.271],
      [0.75, 0.843],
      [0.5, 0.843],
      [0.85, 0.7],
    ],
  ],
  Ȝ: [
    [
      [0.25, 0.341],
      [0.75, 0.271],
      [0.75, 0.664],
      [0.25, 0.736],
    ],
    [
      [0.5, 0.573],
      [0.75, 0.537],
    ],
  ],

  Z: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
    ],
  ],
  Ƶ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
      [0.15, 0.7],
      [0.85, 0.7],
    ],
    [
      [0.15, 0.5],
      [0.85, 0.5],
    ],
  ],
  Ɀ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
      [0.15, 0.7],
      [0.45, 0.7],
      [0.6, 0.9],
      [0.85, 0.9],
    ],
  ],
  Ʒ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
      [0.5, 0.7],
      [0.85, 0.7],
      [0.85, 0.9],
      [0.15, 0.9],
    ],
  ],
  Ƹ: [
    [
      [0.85, 0.271],
      [0.15, 0.271],
      [0.5, 0.7],
      [0.15, 0.7],
      [0.15, 0.9],
      [0.85, 0.9],
    ],
  ],
  Þ: [
    [
      [0.15, 0.414],
      [0.85, 0.414],
      [0.85, 0.75],
      [0.15, 0.75],
    ],
    [
      [0.15, 0.271],
      [0.15, 0.9],
    ],
  ],
  Ƿ: [
    [
      [0.15, 0.414],
      [0.85, 0.271],
      [0.85, 0.557],
      [0.15, 0.7],
    ],
    [
      [0.15, 0.414],
      [0.15, 0.9],
    ],
  ],
  Ƨ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
      [0.85, 0.4],
      [0.15, 0.55],
      [0.15, 0.7],
      [0.85, 0.7],
    ],
  ],
  Ƽ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
    ],
    [
      [0.35, 0.271],
      [0.35, 0.5],
      [0.85, 0.5],
      [0.85, 0.7],
      [0.15, 0.7],
    ],
  ],
  Ƅ: [
    [
      [0.15, 0.171],
      [0.15, 0.718],
    ],
    [
      [0.15, 0.414],
      [0.85, 0.414],
      [0.85, 0.7],
      [0.15, 0.7],
    ],
  ],
  Ɂ: [
    [
      [0.15, 0.271],
      [0.85, 0.271],
      [0.85, 0.557],
      [0.5, 0.557],
      [0.5, 0.7],
    ],
  ],
} as Font;

export { base };
