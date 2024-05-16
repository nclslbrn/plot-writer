import { Font, Glyph, DiaGroup } from "../type";
import { base } from "./base";
import { diaBaseAssociation } from "./diaBaseAssociation";
import { mergeDiacritics } from "../diacritics/mergeDiacritics";
import diacritics from "../diacritics/glyphs";
import { topDia } from "../diacritics/utility";

// Move all diacritics above the letter a little higher up
const upperDia = {} as Font
Object.keys(diacritics).forEach((g: keyof Font) => { 
  upperDia[g] = [...topDia, 'brd'].includes(g) 
    ? diacritics[g].map((l) => l.map((p) => [p[0], p[1] - 0.14]))
    : diacritics[g]
})
// Clone exisiting glyph and add diacritical marks
const diacriticized = {} as Font;
Object.keys(diaBaseAssociation).map((char) => {
  diacriticized[char as keyof typeof diacriticized] = [
    ...base[diaBaseAssociation[char][0] as keyof Font],
    ...mergeDiacritics(diaBaseAssociation[char][1] as DiaGroup, upperDia),
  ] as Glyph;
});

// Merge all glyphs (with and without diacritical marks)
const lowercase = {
  ...base,
  ...diacriticized,
};
export default lowercase;
