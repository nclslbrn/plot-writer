import './style.css';
import p5 from 'p5';
import { type, Glyph, Line, Vec, getGlyphVector } from '@nclslbrn/plot-writer';

let path = [];
const sentences = [...'They devour that by which they themselves wish to be devoured.'];
const sketch = (p5) => {
  let cells = [[0, 0, 1, 1]];
  const expand = (d: number, i: number) =>
    i % 2 === 0
      ? p5.map(d, 0, 1, 20, window.innerWidth - 40)
      : p5.map(d, 0, 1, 20, window.innerHeight - 40);

  const splitCell = () => {
    const toSplit = p5.floor(p5.random(cells.length));
    const [x, y, w, h] = cells[toSplit];
    const splitAt = p5.random([0.166, 0.333, 0.5, 0.666, 0.833]);
    const splitOn = p5.random() > 0.5 ? 'x' : 'y';
    const splitted = [];
    if (splitOn === 'x') {
      splitted.push(
        ...[
          [x, y, w * splitAt, h],
          [x + w * splitAt, y, w * (1 - splitAt), h],
        ]
      );
    } else {
      splitted.push(
        ...[
          [x, y, w, h * splitAt],
          [x, y + h * splitAt, w, h * (1 - splitAt)],
        ]
      );
    }
    cells.splice(toSplit, 1);
    cells.push(...splitted);
  };

  p5.setup = function () {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.background('white');
    p5.fill('tomato');
    p5.stroke('white');
    while (cells.length < sentences.length) splitCell();

    cells.forEach((c, i) => {
      const [x, y, w, h] = c.map((d, i) => expand(d, i));
      p5.rect(x, y, w, h);
      const letter = getGlyphVector(sentences[i % sentences.length], [w, h], [x, y]);
      letter.forEach((line: Line) => {
        p5.beginShape();
        line.forEach((p: Vec) => p5.vertex(...p));
        p5.endShape();
      });
    });
  };
};

// const SVG = () => {}

new p5(sketch, document.getElementById('app')!);
