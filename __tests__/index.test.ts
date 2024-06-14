import { type Char, Glyph, Line } from '../src/type';
import {
  font,
  getGlyphPath,
  getGlyphVector,
  getParagraphPath,
  getParagraphVector,
} from '../src/index';
import { describe, expect, test, assertType } from 'vitest';

// Testing single glyph (each one contained in the font)
const charList = Array.from(Object.keys(font)) as Array<Char>;
const dRegex = /-?(?:\d*\.)?\d+|[a-z]/gi;

describe('Test getGlyphPath() result <path d="*">', () => {
  charList.forEach((c, i, list) => {
    test(`${c} ${i + 1}/${list.length}`, () => {
      const letterPaths = getGlyphPath(c, [1, 0.4], [0, 0]);
      letterPaths.map((pathD) => expect(pathD).toMatch(dRegex));
    });
  });
});

describe('Test getGlyphVector() result Glyph[Line[Vec[x,y]]]', () => {
  charList.forEach((c, i, list) => {
    test(`${c} ${i + 1}/${list.length}`, () => {
      const letterVectors = getGlyphVector(c, [1, 0.4], [0, 0]);
      letterVectors.map((line: Line) => assertType<Line>(line));
    });
  });
});

// Testing paragraph hyphenation
const charPerLine = 32;
describe('Test getParagraphPath() result', () => {
  const paragraph = getParagraphPath(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis venenatis nulla vitae rhoncus. Fusce a sem vel risus vehicula hendrerit. Aliquam erat volutpat. Cras eu massa vulputate, porttitor eros sit amet, vulputate nisi. Aenean justo eros, egestas a turpis sed, mollis imperdiet ex. Sed tempus est et risus pharetra rutrum. Ut porta vitae urna quis vulputate. Nullam et orci ut lacus tincidunt consequat id nec quam. Nulla eget lorem est. Morbi magna elit, pretium sit amet fermentum ut, sollicitudin sit amet est. Nullam tincidunt tortor at est rutrum, vestibulum pharetra ligula mollis.`,
    charPerLine,
    6, // hyphenFrom
    1280, // textWidth
    [1, 1] // spacing
  );
  test('Paragraph height > 0', () => {
    expect(paragraph.height).toBeGreaterThan(0);
  });
  test('Paragraph paths are string (<path d="*">)', () => {
    paragraph.paths.map((pathD) => expect(pathD).toMatch(dRegex));
  });
});

describe('Test getParagraphVector() result', () => {
  const paragraph = getParagraphVector(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis venenatis nulla vitae rhoncus. Fusce a sem vel risus vehicula hendrerit. Aliquam erat volutpat. Cras eu massa vulputate, porttitor eros sit amet, vulputate nisi. Aenean justo eros, egestas a turpis sed, mollis imperdiet ex. Sed tempus est et risus pharetra rutrum. Ut porta vitae urna quis vulputate. Nullam et orci ut lacus tincidunt consequat id nec quam. Nulla eget lorem est. Morbi magna elit, pretium sit amet fermentum ut, sollicitudin sit amet est. Nullam tincidunt tortor at est rutrum, vestibulum pharetra ligula mollis.`,
    charPerLine,
    6, // hyphenFrom
    1280, // textWidth
    [1, 1] // spacing
  );
  test('Paragraph height > 0', () => {
    expect(paragraph.height).toBeGreaterThan(0);
  });
  test('Paragraph vectors are string Glyph[Line[Vec[x,y]]]', () => {
    paragraph.vectors.map((glyph: Glyph) => assertType<Glyph>(glyph));
  });
});
