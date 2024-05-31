import { type Font } from '../type';
import lowercase from './lowercase/index';
import uppercase from './uppercase/index';
import punctuation from './punctuation';
import number from './number';
import currency from './currency';

/*
 * Destructure every glyphs groups to compose the font
 * To go deeper on this font sructure please refer to
 * {@link https://github.com/nclslbrn/plot-writer/blob/main/src/type.d.ts}
 */
const font = {
  ...lowercase,
  ...uppercase,
  ...number,
  ...punctuation,
  ...currency,
} as Font;

export { font };
