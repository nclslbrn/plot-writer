import { type Vec, Line, Glyph, Char } from '../type';
import { font } from '../font/index';
import { bugs } from '../../package.json';
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
 * @param key {string} a single char,⚠️🚨 avoid to pass ' ' (space) as parameter, it will return an empty array
 * @param size {number[]} a 2D size (optional default [1, 1])
 * @param pos {number[]} a 2d coordinate where put the glyph (top left corner), optional default [1, 1]
 * @returns Glyph a single Glyph as [[[line1x1, line1y1],[line1x2, liney2]...]...] an array of line (array of array of number)
 */
const getGlyphVector = (key: Char, size: Vec = [1, 1], pos: Vec = [1, 1]): Glyph =>
  font.hasOwnProperty(key)
    ? (font[key] as Glyph).map((line: Line) => line.map((v: Vec) => scaleAndMove(v, size, pos)))
    : [];

/**
 * Query a single char and returns path as svg text markup (d attributes in a single string)
 * { @link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d }
 *
 * @param key {string} a single char,⚠️🚨 avoid to pass ' ' (space) as parameter, you will be warned since no
 * @param size {number[]} a 2D size (optional default [1, 1])
 * @param pos {number[]} a 2d coordinate where put the glyph (top left corner), (optional default [1, 1])
 * @returns string[] a single Glyph as an array of SVG command (d property of <path> element)
 */
const getGlyphPath = (key: Char, size: Vec = [1, 1], pos: Vec = [0, 0]): string[] => {
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
      `Missing glyph "${key}" You can create it (and add it to this repository by making a pull request) or open an issue ${bugs.url}/new.`
    );
    return [];
  }
};

export { getGlyphPath, getGlyphVector };
