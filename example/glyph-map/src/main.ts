import './style.css';
import { repeatedly, range } from '@thi.ng/transducers';
import { polyline, rect, group, svgDoc, asSvg, line } from '@thi.ng/geom';
import { FMT_yyyyMMdd_HHmmss } from '@thi.ng/date';
import { downloadCanvas, downloadWithMime } from '@thi.ng/dl-asset';
import { draw } from '@thi.ng/hiccup-canvas';
import { $compile } from '@thi.ng/rdom';
import { button, canvas, div } from '@thi.ng/hiccup-html';
import { adaptDPI, isHighDPI } from '@thi.ng/canvas';
import { convert, mul, quantity, NONE } from '@thi.ng/units';
import { type Line, getGlyphVector } from '@nclslbrn/plot-writer';
import { letters, numbers, punctuation, currency } from './glyph';

let comp = group(),
  cnvs: HTMLCanvasElement;

const DPI = quantity(100, 'dpi'),
  A3 = quantity([297, 420], 'mm'),
  SIZE = convert(mul(A3, DPI), NONE),
  MRGN = convert(mul(quantity(20, 'mm'), DPI), NONE),
  BASE = [12.1, 14].map((d) => convert(mul(quantity(d, 'mm'), DPI), NONE)),
  EXTS = [4.25, 5.5].map((d) => convert(mul(quantity(d, 'mm'), DPI), NONE)),
  THRD = (SIZE[0] - MRGN * 2) / 3;

const init = () => {
  cnvs = <HTMLCanvasElement>document.getElementById('main')!;
  const ctx = cnvs!.getContext('2d'),
    dpr = adaptDPI(cnvs, ...SIZE),
    glyphs = [] as polyline[];

  letters.forEach((l, i) => {
    const bx = MRGN + BASE[0] / 2 + (i % 3) * BASE[0] * 7;
    const by = MRGN + BASE[1] / 2 + Math.floor(i / 3) * BASE[1] * 1.25;
    // base letters
    getGlyphVector(l[0], BASE, [bx, by]).map((line: Line) => {
      glyphs.push(polyline(line));
    });

    l.splice(0, 1);
    const lnRetAt = 14;
    const cy = BASE[1] * (0.5 - Math.ceil(l.length / lnRetAt) * 0.19);
    for (let j = 0; j < l.length; j++) {
      const ex = bx + BASE[0] * 1.25 + (j % lnRetAt) * EXTS[0];
      const ey = by + Math.floor(j / lnRetAt) * EXTS[1] + cy;
      getGlyphVector(l[j], EXTS, [ex, ey]).map((line: Line) => {
        glyphs.push(polyline(line));
      });
      glyphs;
    }
  });

  numbers.forEach((n, i) => {
    getGlyphVector(n, BASE, [
      MRGN + BASE[0] / 2 + BASE[0] * (i % 6),
      SIZE[1] - MRGN * 3.25 + BASE[1] * Math.floor(i / 6),
    ]).map((line: Line) => {
      glyphs.push(polyline(line));
    });
  });

  punctuation.forEach((p, i) => {
    getGlyphVector(p, EXTS, [
      MRGN + BASE[0] * 6.3 + BASE[0] * 1.25 + (i % 18) * EXTS[0],
      SIZE[1] - MRGN * 3.12 + Math.floor(i / 18) * EXTS[1],
    ]).map((line: Line) => {
      glyphs.push(polyline(line));
    });
  });

  currency.forEach((n, i) => {
    getGlyphVector(n, EXTS, [
      MRGN + BASE[0] * 13.3 + BASE[0] * 1.25 + (i % 18) * EXTS[0],
      SIZE[1] - MRGN * 3.12 + Math.floor(i / 18) * EXTS[1],
    ]).map((line: Line) => {
      glyphs.push(polyline(line));
    });
  });

  [...'Plot-writer / A SVG text writer for plotter (MIT License) Nicolas LEBRUN'].forEach(
    (l, i) => {
      getGlyphVector(
        l,
        [EXTS[0] * 0.84, EXTS[1]],
        [MRGN + i * EXTS[0] * 0.84, SIZE[1] - MRGN * 1.5]
      ).map((line: Line) => {
        glyphs.push(polyline(line));
      });
    }
  );
  comp = group({}, [
    rect(SIZE, { fill: '#fefefe' }),
    /*
    rect(
      [MRGN, MRGN],
      SIZE.map((d: number) => d - MRGN * 2),
      { fill: 'none', stroke: '#333' }
    ),
    line([MRGN + THRD, MRGN + BASE[1] / 2], [MRGN + THRD, SIZE[1] - (MRGN + BASE[1] * 4)]),
    line([MRGN + THRD * 2, MRGN + BASE[1] / 2], [MRGN + THRD * 2, SIZE[1] - (MRGN + BASE[1] * 4)]),

    line([MRGN, SIZE[1] - MRGN * 3.5], [SIZE[0] - MRGN, SIZE[1] - MRGN * 3.5]),
    line([MRGN, SIZE[1] - MRGN * 1.6], [SIZE[0] - MRGN, SIZE[1] - MRGN * 1.6]),
    */

    group({ stroke: '#333' }, glyphs),
  ]);
  ctx!.scale(dpr, dpr);
  draw(ctx, comp);
};
const downloadJpg = () => downloadCanvas(cnvs, `glyph-map-${FMT_yyyyMMdd_HHmmss()}`, 'jpeg', 1);

const downloadSvg = () =>
  downloadWithMime(
    `glyph-map-${FMT_yyyyMMdd_HHmmss()}.svg`,
    asSvg(
      svgDoc(
        {
          width: SIZE[0],
          height: SIZE[1],
          viewBox: `0 0 ${SIZE[0]} ${SIZE[1]}`,
        },
        comp
      )
    ),
    { mime: 'image/svg+xml' }
  );

$compile(
  div(
    {},
    canvas('#main'),
    div(
      {},
      button(
        {
          onclick: downloadJpg,
          title: 'Download as JPG',
        },
        'Donwload JPG'
      ),
      button(
        {
          onclick: downloadSvg,
          title: 'Download as SVG',
        },
        'Donwload SVG'
      )
    )
  )
).mount(document.getElementById('app')!);

init();
