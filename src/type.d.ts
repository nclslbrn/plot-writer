// A simple 2 vector type
export interface Vec extends Array<number> {}
// Another for line (array of Vec)
export interface Line extends Array<Vec> { }

// And finally an array of Line
export interface Glyph extends Array<Line> { }

export interface Font { [key:string]: Glyph; }
