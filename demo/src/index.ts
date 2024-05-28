import { font, getGlyphPath } from "../../src/index.ts";
import letters from "./letters";
import { trueFalseCheckbox, inputRange, textarea } from "./param.ts";
import { togglablePanel } from "./panel.ts";

const app = document.getElementById("app"),
  header = document.createElement("header"),
  [settingsPanel, openSettingsPanel] = togglablePanel(false, "settings"),
  namespace = "http://www.w3.org/2000/svg",
  svg = document.createElementNS(namespace, "svg"),
  textAtLaunch = "Type text",
  settings = {
    Size: 0.1,
    Debug: true,
    Text: textAtLaunch,
  },
  fontKey = Array.from(Object.keys(font)),
  glyphKeys = letters.filter((l) => fontKey.includes(l)).join(""),
  group = document.createElementNS(namespace, "g");

const init = () => {
  if (app === null) return;

  group.setAttribute("stroke", "#333");
  group.setAttribute("stroke-linejoin", "round");
  group.setAttribute("stroke-linecap", "round");
  group.setAttribute("fill", "rgba(0, 0, 0, 0)");

  svg.appendChild(group);
  app.appendChild(header);
  app.appendChild(settingsPanel);

  textarea("Text", settings.Text, header, updateSettings);
  header.appendChild(openSettingsPanel);
  inputRange(
    "Size",
    settings.Size,
    settingsPanel,
    updateSettings,
    0.01,
    0.2,
    0.01,
  );
  trueFalseCheckbox("Debug", settings.Debug, settingsPanel, updateSettings);

  app.appendChild(svg);
  render();
};

const render = () => {
  let height = window.innerHeight;
  const userInput = settings.Text !== textAtLaunch ? settings.Text : glyphKeys,
    text = userInput.split("") as string[],
    width = window.innerWidth - 40,
    baseSize = Math.max(
      16,
      Math.min(Math.floor(Math.hypot(width, height) * settings.Size), 264),
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
      if (char === " ") continue;

      const lines = getGlyphPath(char, textSize, [
        margin[0] + x * textSize[0],
        margin[1] + y * textSize[1],
      ]);

      if (settings.Debug) {
        const rect = document.createElementNS(namespace, "rect");
        rect.setAttribute("x", `${margin[0] + x * textSize[0]}`);
        rect.setAttribute("y", `${margin[1] + y * textSize[1]}`);
        rect.setAttribute("width", `${textSize[0]}`);
        rect.setAttribute("height", `${textSize[1]}`);
        rect.setAttribute("title", char);
        group.appendChild(rect);

        const label = document.createElementNS(namespace, "text");
        label.setAttribute("x", `${margin[0] + x * textSize[0] + 10}`);
        label.setAttribute("y", `${margin[1] + y * textSize[1] + 20}`);
        label.setAttribute("font-size", `${settings.Size * 15}em`);
        label.textContent = char;
        group.appendChild(label);
      }

      lines.map((d: string) => {
        const path = document.createElementNS(namespace, "path");
        path.setAttribute("d", d);
        group.appendChild(path);
      });
    }
  }
  group.setAttribute("stroke-width", `${settings.Size * 30}`);

  svg.setAttribute("width", `${width}`);
  svg.setAttribute("height", `${height + 40}`);
  svg.setAttribute("viewbox", `0 0 ${width} ${height + 40}`);
};

const updateSettings = (propName: any, propValue: any) => {
  settings[propName] = propValue;
  render();
};

init();
