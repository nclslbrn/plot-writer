import { type ExtendedTable } from "../../type";

// Associate diacritics with existing glyph
const diaBaseAssociation = {
  // a
  Á: ["A", ["ct"]],
  À: ["A", ["gr"]],
  Ă: ["A", ["br"]],
  Ắ: ["A", ["br"]],
  Ằ: ["A", ["br"]],
  Ẵ: ["A", ["br"]],
  Ẳ: ["A", ["br"]],
  Â: ["A", ["cr"]],
  Ấ: ["A", ["cr"]],
  Ầ: ["A", ["cr"]],
  Ẫ: ["A", ["cr"]],
  Ẩ: ["A", ["cr"]],
  Ǎ: ["A", ["hc"]],
  Å: ["A", ["gs"]],
  Ǻ: ["A", ["gs"]],
  Ä: ["A", ["dr"]],
  Ǟ: ["A", ["dr"]],
  Ã: ["A", ["tl"]],
  Ȧ: ["A", ["da"]],
  Ǡ: ["A", ["da"]],
  Ą: ["A", ["gnk"]],
  Ā: ["A", ["mc"]],
  Ả: ["A", ["ha"]],
  Ȁ: ["A", ["gr", "gr"]],
  Ȃ: ["A", ["bri"]],
  Ạ: ["A", ["db"]],
  Ặ: ["A", ["bri", "db"]],
  Ậ: ["A", ["cr", "db"]],
  Ḁ: ["A", ["gsb"]],
  Ǽ: ["Æ", ["ct"]],
  Ǣ: ["Æ", ["mc"]],
  Ⱥ: ["A", ["brd"]],

  // B
  Ḃ: ["B", ["da"]],
  Ḅ: ["B", ["db"]],
  Ḇ: ["B", ["lb"]],

  // C
  Ć: ["C", ["ct"]],
  Ĉ: ["C", ["cr"]],
  Č: ["C", ["hc"]],
  Ċ: ["C", ["da"]],
  Ç: ["C", ["cd"]],
  Ḉ: ["C", ["cd", "ct"]],
  Ȼ: ["C", ["brd"]],

  // D
  Ď: ["D", ["hc"]],
  Ḋ: ["D", ["da"]],
  Ḑ: ["D", ["cd"]],
  Ḍ: ["D", ["db"]],
  Ḓ: ["D", ["crb"]],
  Ḏ: ["D", ["lb"]],
  Ð: ["Đ", []],
  Ɖ: ["Đ", []],


} as ExtendedTable;

export { diaBaseAssociation };
