import { type Char, getGlyphPath, getParagraphPath } from '../../src/index.ts';
import { inputRange, textarea, button } from './field.ts';
import { togglablePanel } from './panel.ts';
import { name, version } from '../../package.json';
import quotes from './quotes.ts';

const app = document.getElementById('app'),
  header = document.createElement('header'),
  [settingsPanel, openSettingsPanel] = togglablePanel(false, '☰', '✖'),
  namespace = 'http://www.w3.org/2000/svg',
  svg = document.createElementNS(namespace, 'svg'),
  settings = {
    Text: quotes[Math.floor(Math.random() * quotes.length)],
    'Letters per line': 60,
    'Letter spacing': 1,
    'Line spacing': 0.92,
  },
  group = document.createElementNS(namespace, 'g');

const pathFromD = (d: string): SVGPathElement => {
  const path = document.createElementNS(namespace, 'path');
  path.setAttribute('d', d);
  return path;
};

const init = () => {
  if (app === null) return;
  app.appendChild(header);
  app.appendChild(settingsPanel);

  const svgLogo = svg.cloneNode(true),
    logoGlyphSize = [window.innerWidth / 100, 48],
    logoText = `${name.replace('@nclslbrn/', '')}: ${version}`;

  ([...logoText] as Array<Char>).forEach((l: Char, x: number) => {
    if (l !== ' ') {
      // prevent empty space
      const line = getGlyphPath(l, logoGlyphSize, [x * logoGlyphSize[0], 0]);
      line.forEach((d: string) => svgLogo.appendChild(pathFromD(d)));
    }
  });
  header.appendChild(svgLogo);
  header.appendChild(openSettingsPanel);

  textarea('Text', settings.Text, settingsPanel, updateSettings);
  inputRange(
    'Letters per line',
    settings['Letters per line'],
    settingsPanel,
    updateSettings,
    12,
    120,
    1
  );
  inputRange(
    'Letter spacing',
    settings['Letter spacing'],
    settingsPanel,
    updateSettings,
    0.7,
    1.4,
    0.01
  );
  inputRange(
    'Line spacing',
    settings['Line spacing'],
    settingsPanel,
    updateSettings,
    0.5,
    1.4,
    0.01
  );
  button('Download SVG', settingsPanel, download);

  group.setAttribute('stroke', '#333');
  group.setAttribute('stroke-linejoin', 'round');
  group.setAttribute('stroke-linecap', 'round');
  group.setAttribute('fill', 'rgba(0, 0, 0, 0)');
  group.setAttribute('fill-opacity', '0');
  svg.appendChild(group);
  app.appendChild(svg);
  render();
  window.onresize = () => {
    setTimeout(render, 600);
  };
};

const download = () => {
  let svgFile = '';
  const svgMarkup = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        ${svg.outerHTML}`;
  const data = new Blob([svgMarkup], {
    type: 'image/svg+xml',
  });
  if (svgFile !== null) {
    window.URL.revokeObjectURL(svgFile);
  }
  svgFile = window.URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = svgFile;
  link.download = `plot-writer-${new Date().toISOString()}.svg`;
  link.click();
};

const render = () => {
  let height = window.innerHeight;
  const userInput = settings.Text,
    width = window.innerWidth - 40;

  group.textContent = '';
  const textBlock = getParagraphPath(userInput, settings['Letters per line'], 5, width, [
    settings['Letter spacing'],
    settings['Line spacing'],
  ]);
  textBlock.paths.forEach((d: string) => {
    const path = document.createElementNS(namespace, 'path');
    path.setAttribute('d', d);
    group.appendChild(path);
  });

  //group.setAttribute('stroke-width', width < 800 ? '0.5' : '2');
  svg.setAttribute('width', `${width}`);
  svg.setAttribute('height', `${textBlock.height + 40}`);
  svg.setAttribute('viewbox', `0 0 ${width} ${height + 40}`);
};

const updateSettings = (propName: any, propValue: any) => {
  settings[propName] = propValue;
  render();
};

init();
