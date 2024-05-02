// A simple 2D vector type
export interface Vec extends Array<number> {}

// Another for line (array of Vec)
export interface Line extends Array<Vec> {}

// Another for letter (array of Line)
export interface Glyph extends Array<Line> {}

// An array of diacritics key (two or three letters)
export interface DiaGroup extends Array<keyof Font> {}

// Table to dupplicate existing glyph with diacriticals marks
export interface ExtendedTable {
  [key: string]: [string, string[]];
}

// And finally a type for the whole font
// where each glyph is defined in an object
// with the char as a key
export interface Font {
  [key: string]: Glyph;
}
