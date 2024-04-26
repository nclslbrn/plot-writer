import { font, getGlyphPath } from "../../src/index.ts";

const app = document.getElementById("app"),
  width = window.innerWidth,
  height = window.innerHeight,
  form = document.createElement("form"),
  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
  input = document.createElement("textarea"),
  textAtLaunch = "Type text",
  glyphKeys = Array.from(Object.keys(font)).join(""),
  group = document.createElementNS("http://www.w3.org/2000/svg", "g");

const update = () => {
  console.log(input.value)
  const userInput = input.value !== textAtLaunch ? input.value : glyphKeys,
    text = userInput.split("") as string[],
    textSize = 64,
    charPerLine = Math.floor(width / textSize),
    nbLines = Math.ceil(text.length / charPerLine);

  group.textContent = "";

  for (let y = 0; y < nbLines; y++) {
    for (
      let x = 0;
      x < Math.min(charPerLine, text.length - y * charPerLine);
      x++
    ) {
      const char = text[y * charPerLine + x];
      console.log(char);

      const lines = getGlyphPath(
        char,
        [textSize, textSize],
        [x * textSize, y * textSize],
      );
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
};

const init = () => {
  if (app === null) return;
  form.autocomplete = "off";
  svg.setAttribute("width", `${width}px`);
  svg.setAttribute("height", `${height - 10}`);
  svg.setAttribute("viewbox", `0 0 ${width} ${height - 10}`);
  group.setAttribute("stroke", "#333");
  group.setAttribute("fill", "rgba(0, 0, 0, 0)");
  svg.appendChild(group);
  input.innerText = textAtLaunch;
  input.addEventListener("change", update);
  form.appendChild(input);
  app.appendChild(form);
  app.appendChild(svg);
};

init();
update();
