import { type Char } from '../src/type';
import { font, getGlyphPath, getGlyphVector } from '../src/index';
import {describe, expect, test} from '@jest/globals';

const charList = Array.from(Object.keys(font)) as Array<Char>;


describe("Test getGlyphPath() result", () => {
  charList.forEach((c, i, list) => {
    test(`${c} ${i+1}/${list.length}`, () => {
      expect(getGlyphPath(c, [1, 0.4], [0, 0])).toMatch(/[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g)
    })
  })
})
