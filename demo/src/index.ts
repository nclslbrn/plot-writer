import { font, getGlyphPath } from "../../src/index.ts";

const app = document.getElementById("app"),
  form = document.createElement("form"),
  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
  input = document.createElement("textarea"),
  textAtLaunch = "Type text",
  glyphKeys = Array.from(Object.keys(font)).join(""),
  group = document.createElementNS("http://www.w3.org/2000/svg", "g");

const update = () => {
  const userInput = input.value !== textAtLaunch ? input.value : glyphKeys,
    text = userInput.split("") as string[],
    width = window.innerWidth - 20,
    height = window.innerHeight - 20,
    textSize = Math.max(54, Math.min(Math.floor(width * 0.07), 128)),
    charPerLine = Math.floor(width / textSize),
    nbLines = Math.ceil(text.length / charPerLine),
    margin = [
      width / (charPerLine * textSize * 2),
      (height - 40 - nbLines * textSize) / 2,
    ];
  console.log(textSize)
  group.textContent = "";

  for (let y = 0; y < nbLines; y++) {
    const remainingChar = Math.min(charPerLine, text.length - y * charPerLine);
    
    for (let x = 0; x < remainingChar; x++) {
      const char = text[y * charPerLine + x];
      const lines = getGlyphPath(
        char,
        [textSize, textSize],
        [margin[0] + x * textSize, margin[1] + y * textSize],
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
  svg.setAttribute("width", `${width}`);
  svg.setAttribute("height", `${height - 40}`);
  svg.setAttribute("viewbox", `0 0 ${width} ${height - 40}`);
};

const init = () => {
  if (app === null) return;
  form.autocomplete = "off";
  group.setAttribute("stroke", "#333");
  group.setAttribute("fill", "rgba(0, 0, 0, 0)");
  svg.appendChild(group);
  input.innerText = textAtLaunch;
  input.addEventListener("change", update);
  form.appendChild(input);
  app.appendChild(form);
  app.appendChild(svg);
};

window.addEventListener("resize", update);

init();
update();
