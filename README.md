# Plot-writer

![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fnclslbrn%2Fplot-writer%2Fmain%2Fpackage.json&query=version&prefix=ver.&style=flat-square&logo=npm&logoSize=200&label=plot-writer&labelColor=red&color=slategray&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40nclslbrn%2Fplot-writer)
 An SVG text writer for plotter.
 
This library allows you to obtain an SVG plot from text, each glyph drawn with simple lines (no outlines).

![a plot made with PlotWriter](https://raw.githubusercontent.com/nclslbrn/plot-writer/main/plotwriter.jpg)


The SVG font supports all characters of the [Latin Extended-A alphabet](https://en.wikipedia.org/wiki/Latin_Extended-A).


# Installation 
```
npm i @nclslbrn/plot-writer
```

or if you prefer Yarn (like me)
```
yarn add @nclslbrn/plot-writer
```

# Implementation

## Single char

There is two main functions to convert text (single char) into vector. Both use the same arguments but they don't return the same thing.

### Get SVG command


```js
getGlyphPath(char, size, pos)
```

| parameter | type | decription |
| :---: | :---: | :---: |
| char  | string | the char you want to transform into vector (⚠️ a single char) |
| size  | array (optional) | width and heigth of the letter (default `[1, 1]`) |
| pos   | array (optional) | 2D coordinate of the letter (default `[0, 0]`) |

Returns an array of `<path d="*">` attribute (multiple lines).


<details>
<summary>
Full snippet
</summary>

```js
import { getGlyphPath } from '@nclslbrn/plot-writer';

// setup you SVG before

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
// You can now append p in your SVG or in a group
// paths.forEach((path) => svg.appendChild(path));
```

</details>



### Get the vector path of a letter

```js
getGlyphVector(char, size, pos)
```

| parameter | type | decription |
| :---: | :---: | :---: |
| char  | string | the char you want to transform into vector (⚠️ a single char) |
| size  | array (optional) | width and heigth of the letter (default `[1, 1]`) |
| pos   | array (optional) | 2D coordinate of the letter (default `[0, 0]`) |

Returns an array of coordinate vectors, each line is in an array where 2D coordinates are stored (`[[line1x1, line1y1], [line1x2, line2]...]...]`)


<details>
<summary>
Full snippet
</summary>

```js
import { getGlyphVectors } from '@nclslbrn/plot-writer';

// setup you SVG, its attributes ()
const char = 'A'
const size = [1, 1];
const pos = [0, 0];

const letter = getGlyphVector(char, size, pos);

// A letter can have multiple lines so the function return an array of string
const paths = letter.forEach((line) => {
	// You can alter each line before tracing the line,
	// this function has been created to do so.
	const d = line.reduce((d, v, i) =>
        	(d += `${i === 0 ? 'M' : 'L'}${v.join(',')}${i === line.length - 1 ? '' : ' '}`),
          ''
    );
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
	// Include it in the svg 
	// svg.appendChild(path)
}
```

</details>


## Paragraph (multiple lines w/ experimental hyphenation)

This font supports many language but hyphenation rules are relative to them, it's a basic feature. Maybe these functions could be enhanced and later take a language parameter (en/fr/es/it...) to target specific language hyphenation. 

### Get paragraph path 

```js
getParagraphPath(text, charsPerLine, hyphenFrom, textWidth, spacing)
```



| parameter | type | description |
| :---: | :---: | :---: |
| text | string | the text you want to write (you can include \r\n to add line return) |
| charsPerLine | number | number of characters per line |
| hyphenFrom | number | a threshold to find the right cut between words or where split a word (must be inferior to charsPerLine) |
| textWidth | number | maximum paragraph line length in pixels |
| spacing | array (optional) | `[letter spacing, line spacing]` (default `[1,1]` two factor relative to letter size (must be comprise between 0 & 1) |

Returns an object 
| key | type | description |
| :---: | :---: | :---: |
| paths | array | an array of SVG commands (string) for each line and letter in the paragraph. |
| height | number | the height in pixels of the text block (to apply a translation afterwards, if you want it to be centered or not to stick out of the format) |


<details>
<summary>
Full snippet
</summary>

```js
  // import the lib, create your SVG element 
  const text = "The Latin script, also known as the Roman script, is a writing system based on the letters of the classical Latin alphabet, derived from a form of the Greek alphabet which was in use in the ancient Greek city of Cumae in Magna Graecia. The Greek alphabet was altered by the Etruscans, and subsequently their alphabet was altered by the Ancient Romans. Several Latin-script alphabets exist, which differ in graphemes, collation and phonetic values from the classical Latin alphabet.";
  const textBlock = getParagraphPath(text, 16, 5, 960, [1, 0.6]);
  textBlock.paths.forEach((d: string) => group.appendChild(pathFromD(d)));

```

</details>





### Get paragraph vectors


```js 
getParagraphVector(text, charsPerLine, hyphenFrom, textWidth, spacing)

```

| parameter | type | description |
| :---: | :---: | :---: |
| text | string | the text you want to write (you can include \r\n to add line return) |
| charsPerLine | number | number of characters per line |
| hyphenFrom | number | a threshold to find the right cut between words or where split a word (must be inferior to charsPerLine) |
| textWidth | number | maximum paragraph line length in pixels |
| spacing | array (optional) | `[letter spacing, line spacing]` (default `[1,1]` two factor relative to letter size (must be comprise between 0 & 1) |


Returns an object 
| key | type | description |
| :---: | :---: | :---: |
| paths | array | an array of coordinate vectors, each line is in an array where 2D coordinates are stored (`[[line1x1, line1y1], [line1x2, line2]...]...]`) for each line and letter in the paragraph. |
| height | number | the height in pixels of the text block (to apply a translation afterwards, if you want it to be centered or not to stick out of the format) |



<details>
<summary>
Full snippet
</summary>

```js
  // import the lib, create your SVG element 
  
 const text = "The Latin script, also known as the Roman script, is a writing system based on the letters of the classical Latin alphabet, derived from a form of the Greek alphabet which was in use in the ancient Greek city of Cumae in Magna Graecia. The Greek alphabet was altered by the Etruscans, and subsequently their alphabet was altered by the Ancient Romans. Several Latin-script alphabets exist, which differ in graphemes, collation and phonetic values from the classical Latin alphabet.";
 const textBlock = getParagraphVector(text, 16, 5, 960, [1, 0.6]);
  textBlock.vectors.forEach((g) =>
    g.forEach((l) => {
      const path = document.createElementNS(namespace, 'path');
      path.setAttribute(
        'd',
        l.reduce((d, v, i) =>
           (d += `${i === 0 ? 'M' : 'L'}${v[0]},${v[1]}${i === l.length - 1 ? '' : ' '}`),
          ''
        )
      );
      // add it to a group
      // group.appendChild(path);
    })
  );


```

</details>


# Why 

I wanted to incorporate text into my plotter drawings, but I couldn't find any vector typography that could be used with JavaScript, so I decided to create this tool. Without this specific need I probably wouldn't have created any typography.

Already existing tools exist but doesn't fit all my need :
- p5js has a function (textToPoints) to export vector from text you get an outline and not the inner stroke, and if the text is small, that's a lot of point.
- An extension of Inkscape, Hershey text allows you transform a text into a vector (inner stroke) but it changes the size and appearance of the text.

I wanted something that could be integrated into my code so that I could be more precise about the position and size of the text. Using vectors from JS, it's also possible to apply transformations to them.


The library is published on [npm](https://www.npmjs.com/package/@nclslbrn/plot-writer), the typescript source is tranplied in several formats (CommonJS, UMD and EsNext).



Nicolas Lebrun | [@nclslbrn](https://nicolas-lebrun.fr/contact/)