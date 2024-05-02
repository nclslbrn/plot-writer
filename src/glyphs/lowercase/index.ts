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
] as Array<keyof Font>;

const topDiaCount = (diaKey: keyof Font): number =>
  topDia.includes(diaKey) ? 1 : 0;

const moveDia = {
  tp: (g: Glyph) =>
    g.map((l: Line) => l.map((p: Vec) => [p[0], p[1] - 0.0625])),
  bt: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0], p[1] + 0.125])),
  lf: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0] - 0.125, p[1]])),
  rg: (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [p[0] + 0.125, p[1]])),
};

const mergeDia = (diaKeys: DiaGroup): Glyph => {
  // check if theres is two diacritics and
  // both are situated on top of letter
  const multipleTopDia = diaKeys.reduce(
    (acc: number, dia: keyof Font) => (acc += topDiaCount(dia)),
    0,
  );
  if (diaKeys.length > 1 && multipleTopDia > 1) {
    // move acute accent left
    if (diaKeys.includes("ct")) {
      return diaKeys
        .filter((k: keyof Font) => k !== "ct")
        .reduce(
          (g: Glyph, k: keyof Font) => [
            ...g,
            ...(topDia.includes(k) ? moveDia.rg(diacritics[k]) : diacritics[k]),
          ],
          [...moveDia.lf(diacritics["ct"])],
        );
    }
    // move grave accent right
    else if (diaKeys.includes("gr")) {
      return diaKeys
        .filter((k: keyof Font) => k !== "gr")
        .reduce(
          (g: Glyph, k: keyof Font) => [
            ...g,
            ...(topDia.includes(k) ? moveDia.lf(diacritics[k]) : diacritics[k]),
          ],
          [...moveDia.rg(diacritics["gr"])],
        );
    }
    // move breve bottom
    else if (diaKeys.includes("br")) {
      return diaKeys
        .filter((k: keyof Font) => k !== "br")
        .reduce(
          (g: Glyph, k: keyof Font) => [...g, ...diacritics[k]],
          [...moveDia.bt(diacritics["br"])],
        );
    }
    // move tild up
    else if (diaKeys.includes("tl")) {
      return diaKeys
        .filter((k: keyof Font) => k !== "tl")
        .reduce(
          (g: Glyph, k: keyof Font) => [...g, ...diacritics[k]],
          [...moveDia.tp(diacritics["tl"])],
        );
    }
    // else move macron up
    else if (diaKeys.includes("mc")) {
      return diaKeys
        .filter((k: keyof Font) => k !== "mc")
        .reduce(
          (g: Glyph, k: keyof Font) => [...g, ...diacritics[k]],
          [...moveDia.tp(diacritics["mc"])],
        );
    } else {
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
