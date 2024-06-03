import './style.css';
import { getGlyphVector } from '@nclslbrn/plot-writer';
import { type Vec } from '@thi.ng/vectors';
import { repeatedly, range } from '@thi.ng/transducers';
import { polyline, rect, group, svgDoc, asSvg, Polyline } from '@thi.ng/geom';
import { FMT_yyyyMMdd_HHmmss } from '@thi.ng/date';
import { downloadCanvas, downloadWithMime } from '@thi.ng/dl-asset';
import { asPolygons, asSDF, sample2d } from '@thi.ng/geom-sdf';
import { draw } from '@thi.ng/hiccup-canvas';
import { SYSTEM, pickRandom } from '@thi.ng/random';
import { $compile } from '@thi.ng/rdom';
import { button, canvas, div } from '@thi.ng/hiccup-html';
import { clipPolylinePoly } from '@thi.ng/geom-clip-line';
import { adaptDPI } from '@thi.ng/canvas';

const RES = [256, 256], // A resolution to sample the letters composition
  THEME = ['steelblue', 'tomato', 'LimeGreen', 'gold', 'indigo'],
  T = [...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnpqrstuvwxyz.?,:!^=+/\\~#']; // An array of possible char used in the composition

// We need these two elements:
// `comp` to reuse the composition to export an SVG
// `cnvs` (the canvas element) to export a JPG
let comp = group(),
  cnvs: HTMLCanvasElement;

const init = () => {
  // A canvas will be added to the DOM before init() happens,
  // grab the element to draw the composition
  cnvs = <HTMLCanvasElement>document.getElementById('main')!;
  // Nothing fancy here we need a context to draw in the canvas
  const ctx = cnvs!.getContext('2d'),
    // The dimension of the composition we need to remove 30 pixels of the
    // window height to get room for the two download buttons
    preFrame = [window.innerWidth, window.innerHeight - 30],
    // A scale factor (depends of the DPI of the device)
    dpr = adaptDPI(cnvs, ...preFrame),
    // The final dimension of our canvas (and SVG)
    frame = preFrame.map((d) => d * dpr),
    // The diagonal will be use later to compute distance (with more flexibility)
    diag = Math.hypot(...frame),
    // A crop zone [[x, y], [width, height]
    crop = [[diag * 0.05, diag * 0.05], frame.map((d) => d - diag * 0.1)],
    // Same thing but with four points (clockwisely, from top left to bottom right)
    cropPoly = [
      [crop[0][0], crop[0][1]],
      [crop[1][0], crop[0][1]],
      [crop[1][0], crop[1][1]],
      [crop[0][0], crop[1][1]],
    ],
    // How many chars we will put in the canvas
    numChar = SYSTEM.minmaxInt(12, 36),
    // Convert the number of chars to an array of chars
    chars = [...repeatedly(() => pickRandom(T), numChar)],
    // Then convert it to an array of lines
    lines = chars.reduce((polys: Polyline[], char: string) => {
      const size = Math.round(SYSTEM.minmax(0.1, 0.5) * diag);
      const pos = frame.map((d) => d / 2 + SYSTEM.minmax(-0.35, 0.35) * d);
      // Get a nested list of point from a char (grouped by lines)
      // [
      //  first line
      //  [[x1, y1], [x2, y2]...],
      //  second line
      //  [[x1, y1], [x2, y2]...],
      // ]
      const letterLines = getGlyphVector(
        // This function can be use with only one char
        char,
        // Fonts are designed in square of 0->1, you can adapt the ratio here
        [size, size * 1.4],
        // You can also add a position [x, y] or move the points obtained later [0, 0].
        pos.map((d) => d - size / 2)
      );
      // Since a letter can contains multiple lines and we want a flat array,
      // we use spread syntax and Array.reduce() to concatenate previous letter strokes with new ones
      return [...polys, ...letterLines.map((line: Vec[]) => polyline(line))];
    }, [] as Polyline[]),
    // SDF generation with @thi.ng/geom-sdf
    // I simply reuse the example of the repository (written by Karsten Schimdt)
    // Some documentation are available here (and some examples too)
    // https://github.com/thi-ng/umbrella/tree/develop/packages/geom-sdf
    sdf = asSDF(group({}, lines)),
    image = sample2d(sdf, rect(...crop), RES),
    contours = asPolygons(image, rect(...crop), RES, range(diag * 0.003, diag, diag * 0.005), 0.5),
    weight = diag * 0.0015;
  comp = group({}, [
    group({}, [rect(frame, { fill: '#121010' })]),
    group({ stroke: '#f3f6fa', weight }, contours),
    group(
      {
        // fix a discrepancy whose origin I do not know
        translate: [weight, weight],
        lineJoin: 'round',
        lineCap: 'round',
        stroke: pickRandom(THEME),
        weight,
      },
      // since letter can be larger than sdf, cut lines if they go outside
      lines.reduce(
        (crp: Polyline[], l: Polyline) => [
          ...crp,
          // Usefull function from @thi.ng/geom-clip-line,
          // It removes all parts of line which are outside a polygon
          // https://github.com/thi-ng/umbrella/tree/7d3339310c56ac7fd3572fb3487b6f34f1de57ca/packages/geom-clip-line#api
          ...clipPolylinePoly(l.points, cropPoly).map((pts: Vec) => polyline(pts)),
        ],
        []
      )
    ),
  ]);
  draw(ctx!, comp);
};

const downloadJpg = () => downloadCanvas(cnvs, `letter-offset-${FMT_yyyyMMdd_HHmmss()}`, 'jpeg', 1);

const downloadSvg = () =>
  downloadWithMime(
    `letter-offset-${FMT_yyyyMMdd_HHmmss()}.svg`,
    asSvg(
      svgDoc(
        {
          width: window.innerWidth,
          height: window.innerHeight,
          viewBox: `0 0 ${window.innerWidth} ${window.innerHeight}`,
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
