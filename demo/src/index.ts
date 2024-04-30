import { font, getGlyphPath } from "../../src/index.ts";
import { Glyph, Line, Vec } from "../../src/type";

console.log(
  JSON.stringify(
    font["3"].map(
      (l: Line) => l.map((v: Vec) => [0.33 + v[0] * 0.33, 0.166 + v[1] * 0.33] as Vec) as Line,
    ) as Glyph,
  ),
);

const app = document.getElementById("app"),
  form = document.createElement("form"),
  namespace = "http://www.w3.org/2000/svg",
  svg = document.createElementNS(namespace, "svg"),
  input = document.createElement("textarea"),
  inputSize = document.createElement("input"),
  textAtLaunch = "Type text",
  glyphKeys = Array.from(Object.keys(font)).join(""),
  group = document.createElementNS(namespace, "g");

const update = () => {
  const userInput = input.value !== textAtLaunch ? input.value : glyphKeys,
    text = userInput.split("") as string[],
    fontScale = parseFloat(inputSize.value),
    width = window.innerWidth - 40,
    height = window.innerHeight,
    baseSize = Math.max(16, Math.min(Math.floor(width * fontScale), 264)),
    textSize = [baseSize, baseSize * 1.2],
    charPerLine = Math.floor(width / textSize[0]) - 2,
    nbLines = Math.ceil(text.length / charPerLine),
    margin = [
      (width - charPerLine * textSize[0]) / 2,
      (height - 40 - nbLines * textSize[1]) / 2,
    ];
  group.textContent = "";

  for (let y = 0; y < nbLines; y++) {
    const remainingChar = Math.min(charPerLine, text.length - y * charPerLine);

    for (let x = 0; x < remainingChar; x++) {
      const char = text[y * charPerLine + x];
      const lines = getGlyphPath(char, textSize, [
        margin[0] + x * textSize[0],
        margin[1] + y * textSize[1],
      ]);
      const rect = document.createElementNS(namespace, "rect");
      rect.setAttribute("x", `${margin[0] + x * textSize[0]}`);
      rect.setAttribute("y", `${margin[1] + y * textSize[1]}`);
      rect.setAttribute("width", `${textSize[0]}`);
      rect.setAttribute("height", `${textSize[1]}`);
      group.appendChild(rect);

      lines.map((d: string) => {
        const path = document.createElementNS(namespace, "path");
        path.setAttribute("d", d);
        group.appendChild(path);
      });
    }
  }
  group.setAttribute("stroke-width", `${fontScale * 40}`);

  svg.setAttribute("width", `${width}`);
  svg.setAttribute("height", `${height - 40}`);
  svg.setAttribute("viewbox", `0 0 ${width} ${height - 40}`);
};

const init = () => {
  if (app === null) return;
  form.autocomplete = "off";

  group.setAttribute("stroke", "#333");
  group.setAttribute("stroke-linejoin", "round");
  group.setAttribute("stroke-linecap", "round");
  group.setAttribute("fill", "rgba(0, 0, 0, 0)");

  svg.appendChild(group);

  input.innerText = textAtLaunch;
  input.addEventListener("change", update);

  inputSize.type = "range";
  inputSize.min = "0.05";
  inputSize.value = "0.07";
  inputSize.max = "0.2";
  inputSize.step = "0.01";
  inputSize.addEventListener("change", update);

  form.appendChild(input);
  form.appendChild(inputSize);
  app.appendChild(form);
  app.appendChild(svg);
};
window.addEventListener("resize", update);

init();
update();
