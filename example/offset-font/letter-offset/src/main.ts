import "./style.css";
import { getGlyphVector } from "@nclslbrn/plot-writer";
import { type Vec } from "@thi.ng/vectors";
import {
  polyline,
  rect,
  group,
  svgDoc,
  bounds,
  asSvg,
  // pathFromSvg,
} from "@thi.ng/geom";
import { FMT_yyyyMMdd_HHmmss } from "@thi.ng/date";
import { downloadCanvas, downloadWithMime } from "@thi.ng/dl-asset";
import { range } from "@thi.ng/transducers";
import { asPolygons, asSDF, sample2d } from "@thi.ng/geom-sdf";
import { draw } from "@thi.ng/hiccup-canvas";

const SEED =
    "cement cry method snow pride frozen turn erupt move core best road",
  ROOT = <HTMLElement>document.getElementById("app"),
  CANVAS = document.createElement("canvas"),
  CTX = CANVAS.getContext("2d"),
  MARGIN = 60,
  RES = [256, 256];

let comp = group();

const init = () => {
  const frame = [window.innerWidth, window.innerHeight],
    padded = frame.map((d) => d - MARGIN * 2),
    lSize = [padded[0] / 26, padded[1] / 3],
    words = SEED.split(" "),
    table = words
      .map((w) => (w + "     ").slice(0, 6)) // pad word with space if length < 6
      .reduce((acc: string[][], _: string, i: number, arr: string[]) => {
        if (i % 4 === 0) {
          acc.push([...arr.slice(i, i + 4)]);
        }
        return acc;
      }, []) // create a 2D array (where a row contains three words of 6 chars)
      .map((row: string[], y: number) =>
        [...row.join(" ")] // join words on the same line
          .map((letter: string, x: number) =>
            getGlyphVector(
              letter,
              [lSize[0], lSize[1]],
              [MARGIN + x * lSize[0], MARGIN + y * lSize[1]],
            ) // convert it into vector coordinate
              .map((line: Vec[]) => polyline(line)) // build a line with
              .flat(),
          )
          .flat(),
      )
      .flat(),
    // Can't comment this Karsten Schmidt sorcery
    // https://github.com/thi-ng/umbrella/tree/develop/packages/geom-sdf
    scene = group({}, table),
    sceneBounds = bounds(scene, 40),
    sdf = asSDF(scene),
    image = sample2d(sdf, sceneBounds!, RES),
    contours = asPolygons(image, sceneBounds!, RES, range(-1, 96, 4), 1),
    comp = group({}, [
      group({}, [rect(frame, { fill: "#ffeefe" })]),
      group({ stroke: "#000", weight: 1 }, contours),
      scene,
    ]);

  CANVAS.width = frame[0];
  CANVAS.height = frame[1];
  draw(CTX!, comp);
};

const exportJpg = () =>
  downloadCanvas(CANVAS, `letter-offset-${FMT_yyyyMMdd_HHmmss()}`, "jpeg", 1);

const exportSVG = () =>
  downloadWithMime(
    `letter_offset-${FMT_yyyyMMdd_HHmmss()}.svg`,
    asSvg(
      svgDoc(
        {
          width: window.innerWidth,
          height: window.innerHeight,
          viewBox: `0 0 ${window.innerWidth} ${window.innerHeight}`,
        },
        comp,
      ),
    ),
    { mime: "image/svg+xml" },
  );

ROOT.appendChild(CANVAS);

CANVAS.addEventListener("click", () => {
  exportJpg();
  exportSVG();
});

init();
