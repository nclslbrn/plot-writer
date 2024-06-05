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
            `${lines}<path d="${line.reduce((d: string, v: Vec, i: number) => `${d}${i === 0 ? 'M' : 'L'}${v[0]},${v[1]} `, '')}"/>\r\n\t\t`,
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
    sentencePrinted = false,
    absrctTxt = [...p.random(chars)];
  const baseSize = [7, 10];
  const debug = false;

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

  const noiseLine = (line: Line): Line => {
    const noised = [] as Line;
    for (let i = 0; i < line.length - 1; i++) {
      const distance = Math.hypot(line[i + 1][0] - line[i][0], line[i + 1][1] - line[i][1]);
      const angle = Math.atan2(line[i + 1][1] - line[i][1], line[i + 1][0] - line[i][0]);
      for (let d = 0; d < distance; d++) {
        const pos = [line[i][0] + Math.cos(angle) * d, line[i][1] + Math.sin(angle) * d];
        const def = p.noise(...pos.map((v) => v * 0.007)) * Math.PI;
        const strenght = (d / distance - 0.5) * 0.2 * distance;
        noised.push([pos[0] + Math.cos(def) * strenght, pos[1] + Math.sin(def) * strenght]);
      }
    }
    return noised;
  };

  const fillCell = (cell: number[]): void => {
    const scale = p.random([0.5, 1, 3]);
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
    let sample = p.random() > 0.66 ? absrctTxt : sentence;
    //if (sample === sentence) sentencePrinted = true;
    for (let ly = baseSize[1] * 2; ly < h - baseSize[1] * 2; ly += letterSize[1] * 2) {
      for (let lx = baseSize[0] * 2; lx < w - baseSize[0] * 2; lx += letterSize[0] * 2) {
        const tIdx = readCursor % sample.length;
        const dy = (p.noise(lx / w, ly) - 0.5) * baseSize[1] * 5;

        if (sample[tIdx] !== ' ') {
          const glyph = getGlyphVector(
            sample[tIdx],
            letterSize.map((d) => d * 1.2),
            [x + lx, y + ly + dy]
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
    if (e.key === 'd') getSVG();
    if (e.key === 'p') p.saveCanvas(`letter-in-grid-${new Date().toISOString()}`, 'jpg');
  };
};

new p5(sketch, document.getElementById('app')!);
