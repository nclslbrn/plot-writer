import {
  type Char,
  Line,
  Vec,
  getGlyphPath,
  getParagraphPath,
  getParagraphVector,
} from '../../src/index.ts';
import { inputRange, textarea, button } from './field.ts';
import { togglablePanel } from './panel.ts';
import { name, version } from '../../package.json';
import quotes from './quotes.ts';

let settings;

const app = document.getElementById('app'),
  header = document.createElement('header'),
  [settingsPanel, openSettingsPanel] = togglablePanel(false, '☰', '✖'),
  namespace = 'http://www.w3.org/2000/svg',
  svg = document.createElementNS(namespace, 'svg'),
  pathFromD = (d: string): SVGPathElement => {
    const path = document.createElementNS(namespace, 'path');
    path.setAttribute('d', d);
    return path;
  },
  updateSetting = (propName: any, propValue: any) => {
    settings[propName] = propValue;
    localStorage.setItem(propName, String(propValue));
    render();
  },
  getSetting = (propName: any): string =>
    localStorage.getItem(propName) !== null ? <string>localStorage.getItem(propName) : '',
  group = document.createElementNS(namespace, 'g');

settings = {
  // These settings will be store in the local storage if user change them
  Text: getSetting('Text') || quotes[Math.floor(Math.random() * quotes.length)],
  'Letters per line':
    getSetting('Letters per line') === '' ? 30 : parseInt(getSetting('Letters per line')),
  'Letter spacing':
    getSetting('Letter spacing') === '' ? 0.95 : parseFloat(getSetting('Letter spacing')),
  'Line spacing': getSetting('Line spacing') === '' ? 0.92 : parseFloat(getSetting('Line spacing')),
};

const init = () => {
  if (app === null) return;
  app.appendChild(header);
  app.appendChild(settingsPanel);

  const svgLogo = svg.cloneNode(true),
    logoGlyphSize = [window.innerWidth / 50, 48],
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

  textarea('Text', settings.Text, settingsPanel, updateSetting);
  inputRange(
    'Letters per line',
    settings['Letters per line'],
    settingsPanel,
    updateSetting,
    12,
    120,
    1
  );
  inputRange(
    'Letter spacing',
    settings['Letter spacing'],
    settingsPanel,
    updateSetting,
    0.7,
    1.4,
    0.01
  );
  inputRange(
    'Line spacing',
    settings['Line spacing'],
    settingsPanel,
    updateSetting,
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
  /** using getParagraphPath */
  const textBlock = getParagraphPath(userInput, settings['Letters per line'], 5, width, [
    settings['Letter spacing'],
    settings['Line spacing'],
  ]);
  textBlock.paths.forEach((d: string) => group.appendChild(pathFromD(d)));

  /* using getParagraphVector 
  const textBlock = getParagraphVector(userInput, settings['Letters per line'], 5, width, [
    settings['Letter spacing'],
    settings['Line spacing'],
  ]);
  textBlock.vectors.forEach((g) =>
    g.forEach((l: Line) => {
      const path = document.createElementNS(namespace, 'path');
      path.setAttribute(
        'd',
        l.reduce(
          (com: string, v: Vec, i: number) =>
            (com += `${i === 0 ? 'M' : 'L'}${v[0]},${v[1]}${i === l.length - 1 ? '' : ' '}`),
          ''
        )
      );
      group.appendChild(path);
    })
  );*/
  //group.setAttribute('stroke-width', width < 800 ? '0.5' : '2');
  svg.setAttribute('width', `${width}`);
  svg.setAttribute('height', `${textBlock.height + 40}`);
  svg.setAttribute('viewbox', `0 0 ${width} ${height + 40}`);
};
init();
