import { Font, Glyph, DiaGroup } from '../../type';
import { base } from './base';
import { diaBaseAssociation } from './diaBaseAssociation';
import { mergeDiacritics } from '../diacritics/mergeDiacritics';
import diacritics from '../diacritics/glyphs';

// Clone exisiting glyph and add diacritical marks
const diacriticized = {} as Font;
Object.keys(diaBaseAssociation).map((char) => {
  diacriticized[char as keyof typeof diacriticized] = [
    ...base[diaBaseAssociation[char][0] as keyof Font],
    ...mergeDiacritics(diaBaseAssociation[char][1] as DiaGroup, diacritics),
  ] as Glyph;
});

// Merge all lowercase glyphs (with and without diacritical marks)
const lowercase = {
  ...base,
  ...diacriticized,
};
export default lowercase;
