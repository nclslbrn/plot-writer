import { font, getGlyphPath } from "../../src/index.ts";
import { Glyph, Line, Vec } from "../../src/type";


const lowercase = ["a","á","à","ă","ắ","ằ","ẵ","ẳ","â","ấ","ầ","ẫ","ẩ","ǎ","å","ǻ","ä","ǟ","ã","ȧ","ǡ","ą","ā","ả","ȁ","ȃ","ạ","ặ","ậ","ḁ","æ","ǽ","ǣ","ẚ","ɐ","ɑ","ɒ","b","ḃ","ḅ","ḇ","ʙ","ƀ","ɓ","ƃ","c","ć","ĉ","č","ċ","ç","ḉ","ȼ","ƈ","ɕ","d","ď","ḋ","ḑ","đ","ḍ","ḓ","ḏ","ð","ȸ","ǳ","ʣ","ǆ","ʥ","ʤ","ɖ","ɗ","ƌ","ȡ","ẟ","e","é","è","ĕ","ê","ế","ề","ễ","ể","ě","ë","ẽ","ė","ȩ","ḝ","ę","ē","ḗ","ḕ","ẻ","ȅ","ȇ","ẹ","ệ","ḙ","ḛ","ɇ","ǝ","ə","ɛ","ɘ","ɚ","ɜ","ɝ","ɞ","ʚ","ɤ","f","ḟ","ʩ","ƒ","g","ǵ","ğ","ĝ","ǧ","ġ","ģ","ḡ","ɡ","ɢ","ǥ","ɠ","ʛ","ɣ","ƣ","h","ĥ","ȟ","ḧ","ḣ","ḩ","ħ","ḥ","ḫ","ẖ","ʜ","ƕ","ɦ","ɧ","i","í","ì","ĭ","î","ǐ","ï","ḯ","ĩ","į","ī","ỉ","ȉ","ȋ","ị","ḭ","ĳ","ı","ɪ","ɨ","ɩ","j","ĵ","ǰ","ȷ","ɉ","ʝ","ɟ","ʄ","k","ḱ","ǩ","ķ","ḳ","ḵ","ƙ","ʞ","l","ĺ","ľ","ļ","ł","ḷ","ḹ","ḽ","ḻ","ŀ","ǉ","ỻ","ʪ","ʫ","ʟ","ƚ","ɫ","ɬ","ɭ","ȴ","ɮ","ƛ","ʎ","m","ḿ","ṁ","ṃ","ɱ","n","ń","ǹ","ň","ñ","ṅ","ņ","ṇ","ṋ","ṉ","ǌ","ɴ","ɲ","ƞ","ɳ","ȵ","ŋ","o","ó","ò","ŏ","ô","ố","ồ","ỗ","ổ","ǒ","ö","ȫ","ő","õ","ṍ","ṏ","ȭ","ȯ","ȱ","ø","ǿ","ǫ","ǭ","ō","ṓ","ṑ","ỏ","ȍ","ȏ","ơ","ớ","ờ","ỡ","ở","ợ","ọ","ộ","œ","ɶ","ɔ","ɵ","ɷ","ȣ","p","ṕ","ṗ","ƥ","ɸ","q","ȹ","ʠ","ɋ","ĸ","r","ŕ","ř","ṙ","ŗ","ȑ","ȓ","ṛ","ṝ","ṟ","ʀ","ɍ","ɹ","ɺ","ɻ","ɼ","ɽ","ɾ","ɿ","ʁ","s","ś","ṥ","ŝ","š","ṧ","ṡ","ş","ṣ","ṩ","ș","ſ","ẛ","ß","ʂ","ȿ","ẜ","ẝ","ʃ","ƪ","ʅ","ʆ","t","ť","ẗ","ṫ","ţ","ṭ","ț","ṱ","ṯ","ʨ","ƾ","ʦ","ʧ","ŧ","ƫ","ƭ","ʈ","ȶ","ʇ","u","ú","ù","ŭ","û","ǔ","ů","ü","ǘ","ǜ","ǚ","ǖ","ű","ũ","ṹ","ų","ū","ṻ","ủ","ȕ","ȗ","ư","ứ","ừ","ữ","ử","ự","ụ","ṳ","ṷ","ṵ","ʉ","ɥ","ʮ","ʯ","ɯ","ɰ","ʊ","v","ṽ","ṿ","ʋ","ỽ","ʌ","w","ẃ","ẁ","ŵ","ẘ","ẅ","ẇ","ẉ","ʍ","x","ẍ","ẋ","y","ý","ỳ","ŷ","ẙ","ÿ","ỹ","ẏ","ȳ","ỷ","ỵ","ʏ","ɏ","ƴ","ỿ","ȝ","z","ź","ẑ","ž","ż","ẓ","ẕ","ƍ","ƶ","ȥ","ʐ","ʑ","ɀ","ʒ","ǯ","ƹ","ƺ","ʓ","þ","ƿ","ƨ","ƽ","ƅ","ɂ","ʕ","ʡ","ʢ","ʖ","ʗ","ʘ","ʬ","ʭ"]
/*
console.log(
  JSON.stringify(
    font["3"].map(
      (l: Line) => l.map((v: Vec) => [0.166 + v[0] * 0.33, 0.166 + v[1] * 0.33] as Vec) as Line,
    ) as Glyph,
  ),
);
*/


const rotateGlyph = (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [1 - p[0], 1 - p[1]]))
const scaleGlyph = (g: Glyph) => g.map((l: Line) => l.map((p: Vec) => [0.25 + p[0] * 0.5, 0.25 + p[1] * 0.5]))

// font["ʙ"] = scaleGlyph(font["B"])
console.log(JSON.stringify(scaleGlyph(font['6'])))

for (let l = 0; l < lowercase.length; l++) {
  if (font[lowercase[l]] === undefined) { 
    console.log(`%c ${lowercase[l]}`, "font-size: 3em" )
    break;
  } else {
    console.log(`✅${lowercase[l]}`)
  } 
}


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
  let height = window.innerHeight
  const userInput = input.value !== textAtLaunch ? input.value : glyphKeys,
    text = userInput.split("") as string[],
    fontScale = parseFloat(inputSize.value),
    width = window.innerWidth - 40,
    baseSize = Math.max(16, Math.min(Math.floor(Math.hypot(width, height) * fontScale), 264)),
    textSize = [baseSize, baseSize * 1.2],
    charPerLine = Math.floor(width / textSize[0]) - 2,
    nbLines = Math.ceil(text.length / charPerLine),
    margin = [
      (width - charPerLine * textSize[0]) / 2,
      40,
    ];
  group.textContent = "";

  for (let y = 0; y < nbLines; y++) {
    const remainingChar = Math.min(charPerLine, text.length - y * charPerLine);
    if ((y+1)*textSize[1] >= height-margin[1]) height += (textSize[1]+margin[1])

    for (let x = 0; x < remainingChar; x++) {
      const char = text[y * charPerLine + x];
      const lines = getGlyphPath(char, textSize, [
        margin[0] + x * textSize[0],
        margin[1] + y * textSize[1], textSize[1]
      ]);
      const rect = document.createElementNS(namespace, "rect");
      rect.setAttribute("x", `${margin[0] + x * textSize[0]}`);
      rect.setAttribute("y", `${margin[1] + y * textSize[1]}`);
      rect.setAttribute("width", `${textSize[0]}`);
      rect.setAttribute("height", `${textSize[1]}`);
      rect.setAttribute("title", char)
      const title = document.createElementNS(namespace, "title")
      title.textContent = char
      rect.appendChild(title)

      lines.map((d: string) => {
        const path = document.createElementNS(namespace, "path");
        path.setAttribute("d", d);
        group.appendChild(path);
      });
      group.appendChild(rect);
    }
  }
  group.setAttribute("stroke-width", `${fontScale * 40}`);

  svg.setAttribute("width", `${width}`);
  svg.setAttribute("height", `${height+40}`);
  svg.setAttribute("viewbox", `0 0 ${width} ${height+40}`);
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
