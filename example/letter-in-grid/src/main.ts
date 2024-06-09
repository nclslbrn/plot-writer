import './style.css';
import p5 from 'p5';
import { type Line, Vec, getGlyphVector } from '@nclslbrn/plot-writer';

let paths = [] as Line[],
  readCursor = 0;
const sentence = [
  ...'They devour that by which they themselves wish to be devoured.'.toUpperCase(),
];
const chars = [
  ':.:.:.:  .  ',
  '*  ^  *  ^  ',
  '__=-___==--_',
  '//  //  //  ',
  '° . ° . ° . ',
  '////__',
  '|------+-------',
  '#------',
  'word...:...',
  'devour;   ',
];

const getSVG = (filename: string) => {
  const data = new Blob(
    [
      `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\r\n` +
        `<svg width="${window.innerWidth}" height="${window.innerHeight}" viewbox="0 0 ${window.innerWidth} ${window.innerHeight}">\r\n\t` +
        `<style> path { fill: none; stroke: #333; }</style>\r\n\t\t` +
        paths.reduce(
          (lines: string, line: Line) =>
            `${lines}<path d="${line.reduce((d: string, v: Vec, i: number) => `${d}${i === 0 ? 'M' : 'L'}${v[0]},${v[1]} `, '')}"/>\r\n\t\t`,
          ''
        ) +
        `\r\n\t</svg>`,
    ],
    { type: 'image/svg+xml' }
  );

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(data);
  link.download = filename;
  link.click();
};

const sketch = (p: p5) => {
  let cells = [[0, 0, 1, 1]],
    absrctTxt = [...p.random(chars)];
  const baseSize = [12, 12];

  const expand = (d: number, i: number): number =>
    i % 2 === 0
      ? p.map(d, 0, 1, 20, window.innerWidth - 40)
      : p.map(d, 0, 1, 20, window.innerHeight - 40);

  const splitCell = (): void => {
    const toSplit = p.floor(p.random(cells.length));
    const [x, y, w, h] = cells[toSplit];
    const splitAt = p.random([0.333, 0.5, 0.666]);
    const splitOn = p.random() > 0.5 ? 'x' : 'y';
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

  const fillCell = (cell: number[]): void => {
    const scale = p.random([0.5, 1, 2]);
    const letterSize = baseSize.map((d) => d * scale);
    const [x, y, w, h] = cell.map((d, i) => expand(d, i));
    let sample = p.random() > 0.66 ? absrctTxt : sentence;
    for (let ly = baseSize[1] * 2; ly < h - baseSize[1] * 2; ly += letterSize[1] * 2) {
      for (let lx = baseSize[0] * 2; lx < w - baseSize[0] * 2; lx += letterSize[0] * 2) {
        const tIdx = readCursor % sample.length;
        if (sample[tIdx] !== ' ') {
          const glyph = getGlyphVector(
            sample[tIdx],
            [letterSize[0] * 0.8, letterSize[1]],
            [x + lx - letterSize[0] / 2, y + ly - letterSize[1] / 2]
          );
          glyph.forEach((line: Line) => paths.push(line));
        }
        if (sample !== sentence && p.random() > 0.66) {
          if (p.random() > 0.5) {
            readCursor--;
          }
        } else {
          if (sample !== sentence) {
            readCursor++;
          } else {
            if (readCursor < sentence.length - 1) {
              readCursor++;
            } else {
              sample = [...p.random(chars)];
            }
          }
        }
      }
    }
  };

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight);
    init();
  };
  const init = () => {
    absrctTxt = [...p.random(chars)];
    paths = [];
    readCursor = 0;
    cells = [[0, 0, 1, 1]];

    p.background('white');
    p.noFill();
    p.stroke('#333');
    p.strokeWeight(2);
    for (let i = 0; i < 22; i++) {
      splitCell();
    }

    cells.forEach((c) => fillCell(c));

    paths.forEach((l: Line) => {
      p.beginShape();
      l.forEach((pt: Vec) => p.vertex(pt[0], pt[1]));
      p.endShape();
    });
  };

  p.keyPressed = function (e: KeyboardEvent) {
    if (e.key === 'r') init();
    if (e.key === 'd') getSVG(`letter-in-grid-${new Date().toISOString()}.svg`);
    if (e.key === 'p') p.saveCanvas(`letter-in-grid-${new Date().toISOString()}`, 'jpg');
  };
};

new p5(sketch, document.getElementById('app')!);
