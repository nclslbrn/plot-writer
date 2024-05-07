import { Font, Glyph, DiaGroup, Line, Vec } from "../../type";
import diacritics from "../diacritics";
import { base } from "./base";
import { diaBaseAssociation } from "./diaBaseAssociation";

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
  "hc"
] as Array<keyof Font>;

const topDiaCount = (diaKey: keyof Font): number =>
  topDia.includes(diaKey) ? 1 : 0;

const moveDia = {
  tp: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0], p[1] - 0.125])),
  bt: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0], p[1] + 0.1])),
  lf: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0] - 0.125, p[1]])),
  rg: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0] + 0.125, p[1]])),
};

const joinVector = (diaStack: Glyph[], movedDia: Glyph): Glyph =>
  diaStack.reduce(
    (out: Glyph, curr: Glyph) => [...out, ...curr],
    [...movedDia],
  );

const mergeDia = (diaKeys: DiaGroup): Glyph => {
  // check if theres is two diacritics and
  // both are situated on top of letter
  const multipleTopDia = diaKeys.reduce(
    (acc: number, dia: keyof Font) => (acc += topDiaCount(dia)),
    0,
  );
  if (diaKeys.length > 1 && multipleTopDia > 1) {
    // check double grave
    if (
      diaKeys.reduce((ct: number, k: keyof Font)=> ct += k === 'gr' ? 1 : 0, 0) > 1) {
      return joinVector(
        diaKeys.filter((k) => k != "gr").map((k) => diacritics[k]),
        [...moveDia.lf(diacritics['gr']), ...moveDia.rg(diacritics['gr'])]
      )
    }
    // check double acute
    if (
      diaKeys.reduce((ct: number, k: keyof Font)=> ct += k === 'ct' ? 1 : 0, 0) > 1) {
      return joinVector(
        diaKeys.filter((k) => k != "ct").map((k) => diacritics[k]),
        [...moveDia.lf(diacritics['ct']), ...moveDia.rg(diacritics['ct'])]
      )
    }
    // move tild down
    if (diaKeys.includes("tl")) {
      return joinVector(
        diaKeys.filter((k) => k != "tl").map((k) => diacritics[k]),
        moveDia.bt(diacritics["tl"]),
      );
    }
    // move hacek down
    else if (diaKeys.includes("hc")) {
      return joinVector(
        diaKeys.filter((k) => k != "hc").map((k) => diacritics[k]),
        moveDia.bt(diacritics["hc"]),
      );
    }  
    // move macron down
    else if (diaKeys.includes("mc")) {
      return joinVector(
        diaKeys.filter((k) => k != "mc").map((k) => diacritics[k]),
        moveDia.bt(diacritics["mc"]),
      );
    }
    // move acute accent left
    else if (diaKeys.includes("ct")) {
      return joinVector(
        diaKeys.filter((k) => k != "ct").map((k) => diacritics[k]),
        moveDia.bt(diacritics["ct"]),
      );
    }
    // move grave accent right
    else if (diaKeys.includes("gr")) {
      return joinVector(
        diaKeys.filter((k) => k != "gr").map((k) => diacritics[k]),
        moveDia.bt(diacritics["gr"]),
      );
    } 
    else {
      return diaKeys.reduce(
        (acc: Glyph, k: keyof Font) => [...acc, ...diacritics[k]],
        [] as Glyph,
      );
    }
  } else {
    return diaKeys.reduce(
      (acc: Glyph, k: keyof Font) => [...acc, ...diacritics[k]],
      [] as Glyph,
    );
  }
};

// Clone exisiting glyph and add diacritical marks
const accented = {} as Font;
Object.keys(diaBaseAssociation).map((char) => {
  accented[char as keyof typeof accented] = [
    ...base[diaBaseAssociation[char][0] as keyof Font],
    ...mergeDia(diaBaseAssociation[char][1] as DiaGroup),
  ] as Glyph;
});

// Merge all glyphs and add some ligature
const lowercase = {
  ...base,
  ...accented,
};
export default lowercase;
