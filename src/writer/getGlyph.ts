import { type Vec, Line, Glyph, Char } from '../type';
import { font } from '../font/index';

/**
 * A function to move and scale each glyph vertex/point/Vec coordinates
 *
 * @param Vec v a 2D vector from a glyph line Glypĥ<Line<Vec>>
 * @param Vec size a 2D vector determining the scale of the glyph
 * @param Vec v a 2D vector [x,y], define the position of the glyph
 * @returns Vec the point displaced and remap on a new scale (size)
 */
const scaleAndMove = (v: Vec, size: Vec, pos: Vec): Vec => [
  pos[0] + v[0] * size[0],
  pos[1] + v[1] * size[1],
];

/**
 * Query a single char and returns nested array of 2d glyph coordinates [Line[Vec[x, y]]]
 *
 * @param key {string} a single char
 * @param size {number[]} a 2D size
 * @param pos {number[]} a 2d coordinate where put the glyph (top left corner)
 * @returns Glyph a single Glyph as [[[line1x1, line1y1],[line1x2, liney2]...]...] an array of line (array of array of number)
 */
const getGlyphVector = (key: Char, size: Vec, pos: Vec): Glyph =>
  font.hasOwnProperty(key)
    ? (font[key] as Glyph).map((line: Line) => line.map((v: Vec) => scaleAndMove(v, size, pos)))
    : [];

/**
 * Query a single char and returns path as svg text markup (d attributes in a single string)
 * { @link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d }
 *
 * @param key {string} a single char
 * @param size {number[]} a 2D size
 * @param pos {number[]} a 2d coordinate where put the glyph (top left corner)
 * @returns string[] a single Glyph as an array of SVG command (d property of <path> element)
 */
const getGlyphPath = (key: Char, size: Vec, pos: Vec): string[] => {
  if (font.hasOwnProperty(key)) {
    return (font[key] as Glyph).map(
      (line: Line) =>
        line.reduce(
          (com: string, v: Vec, i: number) =>
            (com += `${i === 0 ? 'M' : 'L'}${scaleAndMove(v, size, pos).join(',')}${i === line.length - 1 ? '' : ' '}`),
          ''
        ),
      ''
    );
  } else {
    console.warn(
      `Missing glyph "${key}" You can create it (and add it to this repository by making a pull request) or open an issue.`
    );
    return [];
  }
};

export { getGlyphPath, getGlyphVector };
