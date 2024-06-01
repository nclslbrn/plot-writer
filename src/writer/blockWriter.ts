import { type Char, Glyph } from '../type';
import { isConsonant, isPuncChar } from './helpers';
import { getGlyphPath, getGlyphVector } from './getGlyph';
/**
 * Get an array of char from a string and max line length (automatic line return and hyphenation)
 * { @link https://en.wikipedia.org/wiki/Hyphen#Justification_and_line-wrapping }
 *
 * @param string text the input text
 * @param number charsPerLine max number of chars on a line
 * @param number hyphenFrom cut and hyphenate threshold,
 * how many chars after line return, greater value reduce hyphenation
 * @returns array a 2D array of chars
 */
const charArray = (text: string, charsPerLine: number, hyphenFrom: number): Array<Array<Char>> => {
  // Position of the cursor
  let x = 0,
    y = 0;
  // A grid of type, each row represent a line of text
  // where each cell is filled with a single char
  const grid: Array<Array<Char>> = [[]];
  // Split string on line return
  const paragraphs: Array<string> = text.split(/\r?\n|\r|\n/g);

  for (let h = 0; h < paragraphs.length; h++) {
    // Split each word of the paragraph
    const words: Array<string> = paragraphs[h].split(' ');
    for (let i = 0; i < words.length; i++) {
      // Split each letter of word
      const letters = words[i].split('') as Array<Char>,
        wordEnd = x + letters.length;

      // Word cut (multiple line)
      if (wordEnd >= charsPerLine) {
        for (let j = 0, l = letters[0]; j < letters.length; j++, l = letters[j]) {
          // word ends at the end of the line
          if (x === charsPerLine - 1 && i === letters.length - 1) {
            grid[y].push(l);
            y++;
            x = 0;
            grid.push([]);
          }
          // the next letter is a punctuation mark
          else if (x + 2 > charsPerLine && j < letters.length - 1 && isPuncChar(letters[j + 1])) {
            grid[y].push(...[l, letters[j + 1]]);
            j++;
            y++;
            x = 0;
            grid.push([]);
          }
          // soft hyphenation between vowel and consonant (create new line)
          // test it before applying hard hyphenation to word
          else if (
            x + hyphenFrom > charsPerLine &&
            j < letters.length - 1 &&
            (!isConsonant(l) || isConsonant(letters[j + 1]))
          ) {
            grid[y].push(...[l as Char, '-' as Char]);
            y++;
            x = 0;
            grid.push([]);
          }
          // hard hyphenation (no rules just prevent line larger than the limit)
          else if (x + 1 > charsPerLine) {
            grid[y].push(...[l as Char, '-' as Char]);
            y++;
            x = 0;
            grid.push([]);
          } else if (x + 1 < charsPerLine) {
            /* before the line end */
            grid[y].push(l);
            if (j == letters.length - 1) {
              grid[y].push(' ' as Char);
              x++;
            }
            x++;
          }
          // put the entire word on the next line
          else {
            const erase = letters.length - j;
            grid[y] = grid[y].splice(0, grid[y].length - erase);
            y++;
            grid[y] = [...[...letters, ' ' as Char]];
            x = letters.length;
            break;
          }
        }
      }
      // word close the line (add space to close the line)
      else if (wordEnd > charsPerLine - hyphenFrom) {
        grid[y].push(...letters);
        grid[y].fill(' ' as Char, wordEnd, charsPerLine - 1);
        y++;
        grid[y] = [];
        x = 0;
      }
      // word on same line and sufficient room (add space after word)
      else if (wordEnd < charsPerLine) {
        grid[y].push(...[...letters, ' ' as Char]);
        x += letters.length + 1;
      }
    }
    y += 2;
    x = 0;
    grid.push(...[[], []]);
  }

  return grid;
};

/**
 * Get an array of vector from a string and max line length
 * This function is particularly useful if you want to alter
 * the path of letters or simply use them with pixels
 *
 * @param string text the input text
 * @param number charsPerLine max number of chars on a line
 * @param number hyphenFrom cut and hyphenate threshold,
 * how many chars after line return, greater value reduce hyphenation
 * @param number textWidth the size in pixels of the line
 * @returns Glyph[] an array of vector [Glyph[Line[Vec[x,y]]]]
 */
const getParagraphVector = (
  text: string,
  charsPerLine: number,
  hyphenFrom: number,
  textWidth: number,
  spacing = [1, 1]
): { vectors: Glyph[]; height: number } => {
  const grid = charArray(text, charsPerLine, hyphenFrom);
  const textSize = [textWidth / charsPerLine, (textWidth / charsPerLine) * 1.4];
  const invSpacing = [(1 / spacing[0]) * textSize[0], (1 / spacing[1]) * textSize[1]];
  const vectors = grid.reduce(
    (out: Glyph[], row: Array<Char>, y: number) => [
      ...out,
      ...row.map((l: Char, x: number) =>
        getGlyphVector(l, invSpacing, [x * textSize[0], y * textSize[1]])
      ),
    ],
    []
  );
  return {
    vectors,
    height: grid.length * textSize[1],
  };
};

/**
 * Get an array of string (SVG command/d attribute of <path>) from a string (input text) and max line length
 * { @link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d }
 *
 * @param string text the input text
 * @param number charsPerLine max number of chars on a line
 * @param number hyphenFrom cut and hyphenate threshold (how many chars after line return)
 * @param number textWidth the size in pixels of the line
 * @returns string[] an array of <path> d attribute
 */
const getParagraphPath = (
  text: string,
  charsPerLine: number,
  hyphenFrom: number,
  textWidth: number,
  spacing = [1, 1]
): { paths: string[]; height: number } => {
  const grid = charArray(text, charsPerLine, hyphenFrom);
  const textSize = [textWidth / charsPerLine, (textWidth / charsPerLine) * 1.4];
  const invSpacing = [(1 / spacing[0]) * textSize[0], (1 / spacing[1]) * textSize[1]];
  const paths = grid.reduce(
    (out: string[], row: Array<Char>, y: number) =>
      [
        ...out,
        ...row
          .map((l: Char, x: number) => {
            return l !== ' '
              ? // Instead of alter the position we change the glyph size
                // to prevent line width change
                getGlyphPath(l, invSpacing, [x * textSize[0], y * textSize[1]])
              : [];
          })
          .flat(),
      ] as string[],
    [] as string[]
  );

  /** debug charsPerLine
   console.log(
    `Line > ${charsPerLine}`, 
    grid
      .filter((lin) => lin.length > charsPerLine)
      .map((len)=> grid.indexOf(len))
  )
  */
  return { paths, height: textSize[1] * grid.length };
};

export { charArray, getParagraphVector, getParagraphPath };
