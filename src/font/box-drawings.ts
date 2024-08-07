import { type Font } from '../type';

/**
 * An object of UTF-8 bow drawings
 *@link {https://www.w3schools.com/charsets/ref_utf_box.asp}
 *
 * Only light drawings here: ─ │ ┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼ ╌ ╎
 */

export default {
  '─': [
    [
      [0, 0.5],
      [1, 0.5],
    ],
  ],
  '│': [
    [
      [0.5, 0],
      [0.5, 1],
    ],
  ],
  '┌': [
    [
      [1, 0.5],
      [0.5, 0.5],
      [0.5, 1],
    ],
  ],
  '┐': [
    [
      [0, 0.5],
      [0.5, 0.5],
      [0.5, 1],
    ],
  ],
  '└': [
    [
      [0.5, 0],
      [0.5, 0.5],
      [1, 0.5],
    ],
  ],
  '┘': [
    [
      [0.5, 0],
      [0.5, 0.5],
      [0, 0.5],
    ],
  ],
  '├': [
    [
      [0.5, 0],
      [0.5, 1],
    ],
    [
      [0.5, 0.5],
      [1, 0.5],
    ],
  ],
  '┤': [
    [
      [0.5, 0],
      [0.5, 1],
    ],
    [
      [0, 0.5],
      [0.5, 0.5],
    ],
  ],
  '┬': [
    [
      [0, 0.5],
      [1, 0.5],
    ],
    [
      [0.5, 0.5],
      [0.5, 1],
    ],
  ],
  '┴': [
    [
      [0.5, 0],
      [0.5, 0.5],
    ],
    [
      [0, 0.5],
      [1, 0.5],
    ],
  ],
  '┼': [
    [
      [0.5, 0],
      [0.5, 1],
    ],
    [
      [0, 0.5],
      [1, 0.5],
    ],
  ],
  '╌': [
    [
      [0, 0.5],
      [0.45, 0.5],
    ],
    [
      [0.55, 0.5],
      [1, 0.5],
    ],
  ],
  '╎': [
    [
      [0.5, 0],
      [0.5, 0.45],
    ],
    [
      [0.5, 0.55],
      [0.5, 1],
    ],
  ],
} as Font;
