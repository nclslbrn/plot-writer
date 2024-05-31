import type { Char, Vec, Line, Glyph, Font } from './type.d.ts';
/* The font objet */
import { font } from './font/index.ts';
/* Functions to get a single char path */
import { getGlyphVector, getGlyphPath } from './writer/getGlyph.ts';
/* Functions to create paragraph */
import { getParagraphPath, getParagraphVector } from './writer/blockWriter.ts';

export type { Char, Vec, Line, Glyph, Font };
export { font, getGlyphPath, getGlyphVector, getParagraphVector, getParagraphPath };
