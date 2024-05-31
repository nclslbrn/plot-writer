import { Font, Glyph, Line, Vec } from '../../type';
/**
 * A list of top keys diactricts use to detect and move diacritics
 */
const topDia = [
  'gr',
  'ct',
  'cr',
  'dr',
  'tl',
  'br',
  'bri',
  'hcr',
  'mc',
  'gs',
  'da',
  'ha',
  'hc',
] as Array<keyof Font>;

/**
 * Helper to count how many diacritics are on top of the letter
 *
 * @param keyof Font diakey a key of diacritics object
 * {@link https://github.com/nclslbrn/plot-writer/blob/main/src/font/diacritics/glyphs.ts}
 * @return 1 if its a top diacritics or 0 if not
 */
const topDiaCount = (diaKey: keyof Font): number =>
  topDia.includes(diaKey) ? 1 : 0;

/**
 * An helper to move diacritics line/vectors coordinate
 *
 * @property function tp move to top
 * @property function bt move to bottom
 * @property function lf move to left
 * @property function rg move to right
 */
const moveDia = {
  tp: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0], p[1] - 0.14])),
  bt: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0], p[1] + 0.1])),
  lf: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0] - 0.125, p[1]])),
  rg: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0] + 0.125, p[1]])),
};

/**
 * An helper function to assemble multiple glyph (multiple 2D lines)
 * in a single Glypĥ
 *
 * @param Glyph[] diaStack an array of glyph (letters + fixed diacritics)
 * @param Glyph movedDia a displaced diacritics
 * @returns Glyph the merge of all the diacritics and the letter
 */
const joinVector = (diaStack: Glyph[], movedDia: Glyph): Glyph =>
  diaStack.reduce(
    (out: Glyph, curr: Glyph) => [...out, ...curr],
    [...movedDia]
  );

export { topDia, topDiaCount, moveDia, joinVector };
