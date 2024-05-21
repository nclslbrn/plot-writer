// A simple 2D vector type
export interface Vec extends Array<number> {}

// A line (array of Vec)
export interface Line extends Array<Vec> {}

// A glyph/letter (array of Line)
export interface Glyph extends Array<Line> {}

// An array of diacritics key (two or three letters )
export interface DiaGroup extends Array<keyof Font> {}

// Table to dupplicate existing glyph with diacriticals marks
// The key is used to defined a diacriticized letter (à,ê,ï),
// the first item of the array define the base letter w/out diacritics (a, e, i),
// the last item is an array of diacricts name (described in diacritics/glyph.ts)
export interface ExtendedTable {
  [key: string]: [string, string[]];
}

// And finally a type for the whole font
// where each glyph is defined in an object
// with the char as a key { a: [], b: []... }
export interface Font {
  [key: string]: Glyph;
}
