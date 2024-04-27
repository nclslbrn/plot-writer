import { font, getGlyphPath } from "../../src/index.ts";

const app = document.getElementById("app"),
  form = document.createElement("form"),
  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
  input = document.createElement("textarea"),
  inputWeight = document.createElement("input"),
  textAtLaunch = "Type text",
  glyphKeys = Array.from(Object.keys(font)).join(""),
  group = document.createElementNS("http://www.w3.org/2000/svg", "g");

const update = () => {
  const userInput = input.value !== textAtLaunch ? input.value : glyphKeys,
    text = userInput.split("") as string[],
    width = window.innerWidth - 40,
    height = window.innerHeight,
    baseSize = Math.max(16, Math.min(Math.floor(width * 0.05), 264)),
    textSize = [baseSize, baseSize * 1.2],
    charPerLine = Math.floor(width / textSize[0]) - 2,
    nbLines = Math.ceil(text.length / charPerLine),
    margin = [
      (width - charPerLine * textSize[0]) / 2,
      (height - 40 - nbLines * textSize[1]) / 2,
    ];
  console.log(textSize);
  group.textContent = "";

  for (let y = 0; y < nbLines; y++) {
    const remainingChar = Math.min(charPerLine, text.length - y * charPerLine);

    for (let x = 0; x < remainingChar; x++) {
      const char = text[y * charPerLine + x];
      const lines = getGlyphPath(char, textSize, [
        margin[0] + x * textSize[0],
        margin[1] + y * textSize[1],
      ]);
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      rect.setAttribute("x", `${margin[0] + x * textSize[0]}`);
      rect.setAttribute("y", `${margin[1] + y * textSize[1]}`);
      rect.setAttribute("width", `${textSize[0]}`);
      rect.setAttribute("height", `${textSize[1]}`);
      group.appendChild(rect);

      lines.map((d: string) => {
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        path.setAttribute("d", d);
        group.appendChild(path);
      });
    }
  }
  svg.setAttribute("width", `${width}`);
  svg.setAttribute("height", `${height - 40}`);
  svg.setAttribute("viewbox", `0 0 ${width} ${height - 40}`);
};

const updateWeight = () =>
  group.setAttribute("stroke-width", inputWeight.value);

const init = () => {
  if (app === null) return;
  form.autocomplete = "off";

  group.setAttribute("stroke", "#333");
  group.setAttribute("stroke-width", "2");
  group.setAttribute("stroke-lineoin", "round");
  group.setAttribute("stroke-linecap", "round");
  group.setAttribute("fill", "rgba(0, 0, 0, 0)");

  svg.appendChild(group);

  input.innerText = textAtLaunch;
  input.addEventListener("change", update);

  inputWeight.type = "range";
  inputWeight.min = "1";
  inputWeight.value = "4";
  inputWeight.max = "10";
  inputWeight.addEventListener("change", updateWeight);

  form.appendChild(input);
  form.appendChild(inputWeight);
  app.appendChild(form);
  app.appendChild(svg);
};

window.addEventListener("resize", update);

init();
update();
