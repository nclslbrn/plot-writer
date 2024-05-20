import { font, getGlyphPath } from "../../src/index.ts";
import { Glyph, Line, Vec } from "../../src/type";
import letters from "./letters";

const DEBUG = true;

const rotateGlyph = (g: Glyph) =>
  g.map((l: Line) => l.map((p: Vec) => [1 - p[0], 1 - p[1]]));
const upscaleGlyph = (g: Glyph) =>
  g.map((l: Line) =>
    l.map((p: Vec) => [p[0] * 1.33 - 0.166, p[1] * 1.33 - 0.33]),
  );

const scaleGlyph = (g: Glyph) =>
  g.map((l: Line) =>
    l.map((p: Vec) => [0.166 + p[0] * 0.66, 0.166 + p[1] * 0.66]),
  );
const mirrorXGlyph = (g: Glyph) =>
  g.map((l: Line) => l.map((p: Vec) => [p[0], 1 - p[1]]));
const mirrorYGlyph = (g: Glyph) =>
  g.map((l: Line) => l.map((p: Vec) => [1 - p[0], p[1]]));

// alert(`ɐ: ${JSON.stringify(mirrorXGlyph(font["S"]))},`);

const fontFamily =
  'ui-monospace, Menlo, Monaco,"Cascadia Mono", "Segoe UI Mono", "Roboto Mono","Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;';
for (let l = 0; l < letters.length; l++) {
  if (font[letters[l]] === undefined) {
    console.log(`%c ${letters[l]}`, `${fontFamily} font-size: 3em`);
    break;
  } else {
    console.log(`%c ✅${letters[l]}`, `${fontFamily} font-size: 2.5em`);
  }
}

const app = document.getElementById("app"),
  form = document.createElement("form"),
  namespace = "http://www.w3.org/2000/svg",
  svg = document.createElementNS(namespace, "svg"),
  input = document.createElement("textarea"),
  inputSize = document.createElement("input"),
  textAtLaunch = "Type text",
  fontKey = Array.from(Object.keys(font)),
  glyphKeys = letters.filter((l) => fontKey.includes(l)).join(""),
  group = document.createElementNS(namespace, "g");

const update = () => {
  let height = window.innerHeight;
  const userInput = input.value !== textAtLaunch ? input.value : glyphKeys,
    text = userInput.split("") as string[],
    fontScale = parseFloat(inputSize.value),
    width = window.innerWidth - 40,
    baseSize = Math.max(
      16,
      Math.min(Math.floor(Math.hypot(width, height) * fontScale), 264),
    ),
    textSize = [baseSize, baseSize * 1.6],
    charPerLine = Math.floor(width / textSize[0]),
    nbLines = Math.ceil(text.length / charPerLine),
    margin = [(width - charPerLine * textSize[0]) / 2, 40];
  group.textContent = "";

  for (let y = 0; y < nbLines; y++) {
    const remainingChar = Math.min(charPerLine, text.length - y * charPerLine);
    if ((y + 1) * textSize[1] >= height - margin[1])
      height += textSize[1] + margin[1];

    for (let x = 0; x < remainingChar; x++) {
      const char = text[y * charPerLine + x];
      const lines = getGlyphPath(char, textSize, [
        margin[0] + x * textSize[0],
        margin[1] + y * textSize[1],
        textSize[1],
      ]);
      const rect = document.createElementNS(namespace, "rect");
      rect.setAttribute("x", `${margin[0] + x * textSize[0]}`);
      rect.setAttribute("y", `${margin[1] + y * textSize[1]}`);
      rect.setAttribute("width", `${textSize[0]}`);
      rect.setAttribute("height", `${textSize[1]}`);
      rect.setAttribute("title", char);

      if (DEBUG) {
        const label = document.createElementNS(namespace, "text");
        label.setAttribute("x", `${margin[0] + x * textSize[0] + 10}`);
        label.setAttribute("y", `${margin[1] + y * textSize[1] + 20}`);
        label.setAttribute("font-size", `${fontScale * 15}em`);
        label.textContent = char;
        group.appendChild(label);
      }

      lines.map((d: string) => {
        const path = document.createElementNS(namespace, "path");
        path.setAttribute("d", d);
        group.appendChild(path);
      });
      group.appendChild(rect);
    }
  }
  group.setAttribute("stroke-width", `${fontScale * 30}`);

  svg.setAttribute("width", `${width}`);
  svg.setAttribute("height", `${height + 40}`);
  svg.setAttribute("viewbox", `0 0 ${width} ${height + 40}`);
};

const init = () => {
  if (app === null) return;
  //form.autocomplete = "off";

  group.setAttribute("stroke", "#333");
  group.setAttribute("stroke-linejoin", "round");
  group.setAttribute("stroke-linecap", "round");
  group.setAttribute("fill", "rgba(0, 0, 0, 0)");

  svg.appendChild(group);

  input.innerText = textAtLaunch;
  input.addEventListener("input", update);
  input.addEventListener("change", update);

  inputSize.type = "range";
  inputSize.min = "0.01";
  inputSize.max = "0.2";
  inputSize.step = "0.01";
  inputSize.value = "0.1";

  inputSize.addEventListener("change", update);

  form.appendChild(input);
  form.appendChild(inputSize);
  app.appendChild(form);
  app.appendChild(svg);
  update();
};

init();
