import { type Vec, Line, Glyph, Font } from "./type";
import lowercase from "./lowercase/index";
import uppercase from "./uppercase/index";
import punctuation from "./punctuation";
import number from "./number";
import currency from "./currency";

/*
 * Destructure every glyphs groups to compose the font
 * To go deeper on the font sructure please refer to type.d.ts
 */
const font = {
  ...lowercase,
  ...uppercase,
  ...number,
  ...punctuation,
  ...currency,
} as Font;

/**
 * A function to move and scale each glyph vertex/point/Vec coordinate
 */
const scaleAndMove = (v: Vec, size: Vec, pos: Vec): Vec => [
  pos[0] + v[0] * size[0],
  pos[1] + v[1] * size[1],
];

/**
 * Query a single char and returns nested array of 2d coordinates Glyph = Line[Vec[]]
 * @param key {string} a single char
 * @param size {number[]} a 2D size
 * @param pos {number[]} a 2d coordinate where put the glyph (top left corner)
 * @returns a single Glyph as [[[x1, y1],[x2, y2]...]...] an array of line (array of array of number)
 */
const getGlyphVector = (key: string, size: Vec, pos: Vec): Glyph =>
  font.hasOwnProperty(key)
    ? (font[key] as Glyph).map((line: Line) =>
        line.map((v: Vec) => scaleAndMove(v, size, pos)),
      )
    : [];

/**
 * Query a single char and returns path as svg text markup (in a single string)
 * @param key {string} a single char
 * @param size {number[]} a 2D size
 * @param pos {number[]} a 2d coordinate where put the glyph (top left corner)
 * @returns a single Glyph as an array of SVG command (d property of <path> element)
 */

const getGlyphPath = (key: string, size: Vec, pos: Vec): string[] => {
  if (font.hasOwnProperty(key)) {
    return (font[key] as Glyph).map(
      (line: Line) =>
        line.reduce(
          (com, v, i) =>
            (com += `${i === 0 ? "M" : "L"}${scaleAndMove(v, size, pos).join(",")}`),
          "",
        ),
      "",
    );
  } else {
    console.warn(
      `Missing glyph "${key}" You can create it (and add it to this repository by making a pull request) or open an issue.`,
    );
    return [];
  }
};

export { font, getGlyphPath, getGlyphVector };
