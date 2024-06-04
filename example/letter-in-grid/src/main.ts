import './style.css';
import p5 from 'p5';
import { type Line, Vec, getGlyphVector } from '@nclslbrn/plot-writer';

let paths = [] as Line[],
  readCursor = 0;
const sentence = [...'They devour that by which they themselves wish to be devoured.'];
const chars = [
  ':.:.:.:  .  ',
  '*  ^  *  ^  ',
  '__=-___==--_',
  '//  //  //  ',
  '° . ° . ° . ',
  '/\\-|-|',
  '////L__',
  '#------',
  '*-^-^-^-',
  'L____n ',
  'ʌ/V\\ʌ________',
  '|___oxo___',
  'x|___\\|/__|',
  '|+--=--+',
];

const getSVG = () => {
  const data = new Blob(
    [
      `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\r\n` +
        `<svg width="${window.innerWidth}" height="${window.innerHeight}" viewbox="0 0 ${window.innerWidth} ${window.innerHeight}">\r\n\t` +
        `<style> path { fill: none; stroke: #333; }</style>\r\n\t\t` +
        paths.reduce(
          (lines: string, line: Line) =>
            `${lines}<path d="${line.reduce((d, v, i) => `${d}${i === 0 ? 'M' : 'L'}${v[0]},${v[1]} `, '')}"/>\r\n\t\t`,
          ''
        ) +
        `\r\n\t</svg>`,
    ],
    { type: 'image/svg+xml' }
  );

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(data);
  link.download = `letter-in-grid-${new Date().toISOString()}.svg`;
  link.click();
};

const sketch = (p: p5) => {
  let cells = [[0, 0, 1, 1]],
    sentencePrinted = false;
  const baseSize = [12, 18];
  const debug = false;

  const expand = (d: number, i: number) =>
    i % 2 === 0
      ? p.map(d, 0, 1, 20, window.innerWidth - 40)
      : p.map(d, 0, 1, 20, window.innerHeight - 40);

  const splitCell = () => {
    let toSplit = -1;
    while (toSplit < 0) {
      const randCell = p.floor(p.random(cells.length));
      if (cells[randCell][2] > 0.166 && cells[randCell][3] > 0.166) {
        toSplit = randCell;
      }
    }
    const [x, y, w, h] = cells[toSplit];
    const splitAt = p.random([0.166, 0.333, 0.5, 0.666, 0.833]);
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

  const fillCell = (cell: number[]) => {
    const scale = p.random([0.5, 1, 2]);
    const letterSize = baseSize.map((d) => d * scale);
    const [x, y, w, h] = cell.map((d, i) => expand(d, i));
    debug &&
      paths.push([
        [x, y],
        [x + w, y],
        [x + w, y + h],
        [x, y + h],
        [x, y],
      ] as Line);
    const sample = p.random() > 0.66 || sentencePrinted ? [...p.random(chars)] : sentence;
    if (sample === sentence) sentencePrinted = true;
    for (let ly = baseSize[1]; ly < h - baseSize[1] * 2; ly += letterSize[1]) {
      for (let lx = baseSize[0]; lx < w - baseSize[0] * 2; lx += letterSize[0]) {
        const tIdx = readCursor % sample.length;

        if (sample[tIdx] !== ' ') {
          const glyph = getGlyphVector(sample[tIdx], letterSize, [x + lx, y + ly]);
          glyph.forEach((line: Line) => paths.push(line));
        }
        if (sample !== sentence && p.random() > 0.66) {
          if (p.random() > 0.5) {
            readCursor--;
          }
        } else {
          readCursor++;
        }
      }
    }
  };

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background('white');
    p.noFill();
    p.stroke('#333');
    for (let i = 0; i < 12; i++) {
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
    if (e.key === 'd') getSVG();
  };
};

new p5(sketch, document.getElementById('app')!);
