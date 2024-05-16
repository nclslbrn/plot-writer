import { Font, Glyph, Line, Vec } from "../type";
// A list of top keys diactricts
// Use to detect and move diacritics
const topDia = [
  "gr",
  "ct",
  "cr",
  "dr",
  "tl",
  "br",
  "bri",
  "hcr",
  "mc",
  "gs",
  "da",
  "ha",
  "hc",
] as Array<keyof Font>;

const topDiaCount = (diaKey: keyof Font): number =>
  topDia.includes(diaKey) ? 1 : 0;

const moveDia = {
  tp: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0], p[1] - 0.14])),
  bt: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0], p[1] + 0.1])),
  lf: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0] - 0.125, p[1]])),
  rg: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0] + 0.125, p[1]])),
};

const joinVector = (diaStack: Glyph[], movedDia: Glyph): Glyph =>
  diaStack.reduce(
    (out: Glyph, curr: Glyph) => [...out, ...curr],
    [...movedDia],
  );

export { topDia, topDiaCount, moveDia, joinVector };
