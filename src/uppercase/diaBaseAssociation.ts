import { type ExtendedTable } from "../type";

// Associate diacritics with existing glyph
const diaBaseAssociation = {
  // a
  Á: ["A", ["ct"]],
  À: ["A", ["gr"]],
  Ă: ["A", ["br"]],
  Ắ: ["A", ["br", "ct"]],
  Ằ: ["A", ["br", "gr"]],
  Ẵ: ["A", ["br", "tl"]],
  Ẳ: ["A", ["br", "ha"]],
  Â: ["A", ["cr"]],
  Ấ: ["A", ["cr", "ct"]],
  Ầ: ["A", ["cr", "gr"]],
  Ẫ: ["A", ["cr", "tl"]],
  Ẩ: ["A", ["cr", "ha"]],
  Ǎ: ["A", ["hc"]],
  Å: ["A", ["gs"]],
  Ǻ: ["A", ["gs", "ct"]],
  Ä: ["A", ["dr"]],
  Ǟ: ["A", ["dr", "mc"]],
  Ã: ["A", ["tl"]],
  Ȧ: ["A", ["da"]],
  Ǡ: ["A", ["da", "mc"]],
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

  É: ["E", ["ct"]],
  È: ["E", ["gr"]],
  Ĕ: ["E", ["br"]],
  Ê: ["E", ["cr"]],
  Ế: ["E", ["cr", "ct"]],
  Ề: ["E", ["cr", "gr"]],
  Ễ: ["E", ["cr", "tl"]],
} as ExtendedTable;

export { diaBaseAssociation };
