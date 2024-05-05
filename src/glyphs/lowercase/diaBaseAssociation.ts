import { type ExtendedTable } from "../../type";

// Associate diacritics with existing glyph
const diaBaseAssociation = {
  // a
  á: ["a", ["ct"]],
  à: ["a", ["gr"]],
  ă: ["a", ["br"]],
  ắ: ["a", ["br", "ct"]],
  ằ: ["a", ["br", "gr"]],
  ẵ: ["a", ["br", "tl"]],
  ẳ: ["a", ["br", "ha"]],
  â: ["a", ["cr"]],
  ấ: ["a", ["cr", "ct"]],
  ầ: ["a", ["cr", "gr"]],
  ẫ: ["a", ["cr", "tl"]],
  ẩ: ["a", ["cr", "ha"]],
  ǎ: ["a", ["hc"]],
  å: ["a", ["gs"]],
  ǻ: ["a", ["gs", "ha"]],
  ä: ["a", ["dr"]],
  ǟ: ["a", ["dr", "mc"]],
  ã: ["a", ["tl"]],
  ȧ: ["a", ["gs"]],
  ǡ: ["a", ["gs", "mc"]],
  ą: ["a", ["cdr"]],
  ā: ["a", ["mc"]],
  ả: ["a", ["ha"]],
  ȁ: ["a", ["gr", "gr"]],
  ȃ: ["a", ["bri"]],
  ạ: ["a", ["db"]],
  ặ: ["a", ["br", "db"]],
  ậ: ["a", ["cr", "db"]],
  ḁ: ["a", ["db"]],
  ǽ: ["æ", ["ct"]],
  ǣ: ["æ", ["mc"]],
  ẚ: ["a", ["hcr"]],
  // b
  ḃ: ["b", ["da"]],
  ḅ: ["b", ["db"]],
  ḇ: ["b", ["lb"]],

  // c
  ć: ["c", ["ct"]],
  ĉ: ["c", ["cr"]],
  č: ["c", ["hc"]],
  ċ: ["c", ["da"]],
  ç: ["c", ["cd"]],
  ḉ: ["c", ["cd", "ct"]],
  ȼ: ["c", ["brd"]],
  ƈ: ["c", ["crs"]],
  // d
  ď: ["d", ["ct"]],
  ḋ: ["d", ["da"]],
  ḑ: ["d", ["cd"]],
  ḍ: ["d", ["db"]],
  ḓ: ["d", ["crb"]],
  ḏ: ["d", ["lb"]],
  ɖ: ["d", ["crs"]],
  // e
  é: ["e", ["ct"]],
  è: ["e", ["gr"]],
  ĕ: ["e", ["br"]],
  ê: ["e", ["cr"]],
  ế: ["e", ["cr", "ct"]],
  ề: ["e", ["cr", "gr"]],
  ễ: ["e", ["cr", "tl"]],
  ể: ["e", ["cr", "ha"]],
  ě: ["e", ["hc"]],
  ë: ["e", ["dr"]],
  ẽ: ["e", ["tl"]],
  ė: ["e", ["gs"]],
  ȩ: ["e", ["cd"]],
  ḝ: ["e", ["br", "cd"]],
  ę: ["e", ["gnk"]],
  ē: ["e", ["mc"]],
  ḗ: ["e", ["ct", "mc"]],
  ḕ: ["e", ["gr", "mc"]],
  ẻ: ["e", ["ha"]],
  ȅ: ["e", ["gr", "gr"]],
  ȇ: ["e", ["bri"]],
  ẹ: ["e", ["db"]],
  ệ: ["e", ["cr", "db"]],
  ḙ: ["e", ["crb"]],
  ḛ: ["e", ["tlb"]],
  ɇ: ["e", ["brd"]],

  // f
  ḟ: ["f", ["da"]],

  // g
  ǵ: ["g", ["ct"]],
  ğ: ["g", ["br"]],
  ĝ: ["g", ["cr"]],
  ǧ: ["g", ["hc"]],
  ġ: ["g", ["da"]],
  ģ: ["g", ["gr"]],
  ḡ: ["g", ["mc"]],
  ɠ: ["g", ["hr"]],

  // h
  ĥ: ["h", ["cr"]],
  ȟ: ["h", ["hc"]],
  ḧ: ["h", ["dr"]],
  ḣ: ["h", ["da"]],
  ḩ: ["h", ["cdl"]],
  ḥ: ["h", ["db"]],
  ḫ: ["h", ["brb"]],
  ẖ: ["h", ["lb"]],

  // i
  í: ["i_", ["ct"]],
  ì: ["i_", ["gr"]],
  ĭ: ["i_", ["br"]],
  î: ["i_", ["cr"]],
  ǐ: ["i_", ["hc"]],
  ï: ["i_", ["dr"]],
  ḯ: ["i_", ["ct", "dr"]],
  ĩ: ["i_", ["tl"]],
  į: ["i", ["gnk"]],
  ī: ["i_", ["mc"]],
  ỉ: ["i_", ["ha"]],
  ȉ: ["i_", ["gr", "gr"]],
  ȋ: ["i_", ["bri"]],
  ị: ["i", ["db"]],
  ḭ: ["i", ["tlb"]],





  //Ỉ: ["i", ["ha"]],
  //Ị: ["i", ["db"]],

  // o
  ọ: ["o", ["db"]],
  ỏ: ["o", ["ha"]],
  ố: ["o", ["cr", "ct"]],
  ồ: ["o", ["cr", "gr"]],
  ổ: ["o", ["cr", "ha"]],
  ỗ: ["o", ["cr", "tl"]],
  ộ: ["o", ["cr", "db"]],
  ớ: ["o", ["hr", "ct"]],
  ờ: ["o", ["hr", "gr"]],
  ở: ["o", ["hr", "ha"]],
  ỡ: ["o", ["hr", "tl"]],
  ợ: ["o", ["hr", "db"]],

  // u
  ụ: ["u", ["db"]],
  ủ: ["u", ["ha"]],
  ứ: ["u", ["hr", "ct"]],
  ừ: ["u", ["hr", "gr"]],
  ử: ["u", ["hr", "ha"]],
  ữ: ["u", ["hr", "tl"]],
  ự: ["u", ["hr", "db"]],

  // y
  ỳ: ["y", ["gr"]],
  ỵ: ["y", ["db"]],
  ỷ: ["y", ["ha"]],
  ỹ: ["y", ["tl"]],
} as ExtendedTable;

export { diaBaseAssociation };
