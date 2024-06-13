# Plot-writer

A SVG text writer for plotter.
This library allows you to obtain an SVG plot from text, each glyph drawn with simple lines (no outlines).

![a plot made with PlotWriter](https://raw.githubusercontent.com/nclslbrn/plot-writer/main/plotwriter.jpg)

This library is currently in beta.
The SVG font will support all characters of the [Latin Extended-A alphabet](https://en.wikipedia.org/wiki/Latin_Extended-A).

# Use

There is two main functions to convert text (single char) into vector. Both use the same arguments but they don't return the same thing.

## Installation 
```
npm i @nclslbrn/plot-writer
```
or if you prefer Yarn (like me)
```
yarn add @nclslbrn/plot-writer
```

## Implementation

### Get SVG command (single char)
```
import { getGlyphPath } from '@nclslbrn/plot-writer';
const char = 'A'
const size = [1, 1];
const pos = [0, 0];

const svgsD = getGlyphPath(char, size, pos);

// A letter can have multiple lines so the function return an array of string
const paths = svgsD.map((d) => {
	const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	p.setAttribute('d', d);
	return p;
}
// You can now append p in your SVG or in a <group>
```

| parameter | type | decription |
| :---: | :---: | :---: |
| char  | string | the char you want to transform into vector |
| size  | Array | width and heigth of the letter (default [1, 1]) |
| pos   | Array | 2D coordinate of the letter (default [0, 0]) |

[Snippet to use it with words/sentence](#Words)

<details>
<summary>
# Why 
</summary>
I wanted to incorporate text into my plotter drawings, but I couldn't find any vector typography that could be used with JavaScript, so I decided to create this tool. Without this specific need I probably wouldn't have created any typography.

Already existing tools exist but doesn't fit all my need :
- p5js has a function (textToPoints) to export vector from text you get an outline and not the inner stroke, and if the text is small, that's a lot of point.
- An extension of Inkscape, Hershey text allows you transform a text into a vector (inner stroke) but it changes the size and appearance of the text.

I wanted something that could be integrated into my code so that I could be more precise about the position and size of the text. Using vectors from JS, it's also possible to apply transformations to them.
</details>

The glyphs are currently being designed.

The library will be published on npm once completed, but you can already try it out by compiling the sources (yarn run build), which will create the modules in several formats (CommonJS, UMD and EsNext) in dist/.
