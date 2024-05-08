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
  ɖ: ["d", ["gnk"]],
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
  ė: ["e", ["da"]],
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
  ɠ: ["g", ["crs"]],

  // h
  ĥ: ["h", ["cr"]],
  ȟ: ["h", ["hc"]],
  ḧ: ["h", ["dr"]],
  ḣ: ["h", ["da"]],
  ḩ: ["h", ["cd"]],
  ḥ: ["h", ["db"]],
  ḫ: ["h", ["brb"]],
  ẖ: ["h", ["lb"]],

  // i
  í: ["ı", ["ct"]],
  ì: ["ı", ["gr"]],
  ĭ: ["ı", ["br"]],
  î: ["ı", ["cr"]],
  ǐ: ["ı", ["hc"]],
  ï: ["ı", ["dr"]],
  ḯ: ["ı", ["ct", "dr"]],
  ĩ: ["ı", ["tl"]],
  į: ["i", ["gnkc"]],
  ī: ["ı", ["mc"]],
  ỉ: ["ı", ["ha"]],
  ȉ: ["ı", ["gr", "gr"]],
  ȋ: ["ı", ["bri"]],
  ị: ["i", ["db"]],
  ḭ: ["i", ["tlb"]],
  //Ỉ: ["i", ["ha"]],
  //Ị: ["i", ["db"]],

  // j
  ĵ: ["ȷ", ["cr"]],
  ǰ: ["ȷ", ["hc"]],

  // k
  ḱ: ["k", ["ct"]],
  ǩ: ["k", ["hc"]],
  ķ: ["k", ["cm"]],
  ḳ: ["k", ["db"]],
  ḵ: ["k", ["lb"]],

  // l
  ĺ: ["l", ["ct"]],
  ľ: ["l", ["hr"]],
  ļ: ["l", ["cd"]],
  ḷ: ["l", ["db"]],
  ḹ: ["l", ["db", "mc"]],
  ḽ: ["l", ["crb"]],
  ḻ: ["l", ["lb"]],

  // m
  ḿ: ["m", ["ct"]],
  ṁ: ["m", ["da"]],
  ṃ: ["m", ["db"]],
  ɱ: ["m", ["hbr"]],

  // n
  ń: ["n", ["ct"]],
  ǹ: ["n", ["gr"]],
  ň: ["n", ["hc"]],
  ñ: ["n", ["tl"]],
  ṅ: ["n", ["da"]],
  ņ: ["n", ["cm"]],
  ṇ: ["n", ["db"]],
  ṋ: ["n", ["crb"]],
  ṉ: ["n", ["lb"]],
  ŋ: ["n", ["hbr"]],

  // o
  ó: ["o", ["ct"]],
  ò: ["o", ["gr"]],
  ŏ: ["o", ["br"]],
  ô: ["o", ["cr"]],
  ố: ["o", ["cr", "ct"]],
  ồ: ["o", ["cr", "gr"]],
  ỗ: ["o", ["cr", "tl"]],
  ổ: ["o", ["cr", "ha"]],
  ǒ: ["o", ["hc"]],
  ö: ["o", ["dr"]],
  ȫ: ["o", ["dr", "mc"]],
  ő: ["o", ["ct", "ct"]],
  õ: ["o", ["tl"]],
  ṍ: ["o", ["tl", "ct"]],
  ṏ: ["o", ["tl", "dr"]],
  ȭ: ["o", ["tl", "mc"]],
  ȯ: ["o", ["da"]],
  ȱ: ["o", ["da", "mc"]],
  ø: ["o", ["brd"]],
  ǿ: ["o", ["brd", "ct"]],
  ǫ: ["o", ["gnkc"]],
  ǭ: ["o", ["gnkc", "mc"]],
  ō: ["o", ["mc"]],
  ṓ: ["o", ["mc", "ct"]],
  ṑ: ["o", ["mc", "gr"]],
  ỏ: ["o", ["ha"]],
  ȍ: ["o", ["gr", "gr"]],
  ȏ: ["o", ["bri"]],
  ơ: ["o", ["hr"]],
  ớ: ["o", ["hr", "ct"]],
  ờ: ["o", ["hr", "gr"]],
  ỡ: ["o", ["hr", "tl"]],
  ở: ["o", ["hr", "ha"]],
  ợ: ["o", ["hr", "db"]],
  ọ: ["o", ["db"]],
  ộ: ["o", ["cr", "db"]],

  // p
  ṕ: ["p", ["ct"]],
  ṗ: ["p", ["da"]],

  // q
  ʠ: ["q", ["crs"]],

  // r
  ŕ: ["r", ["ct"]],
  ř: ["r", ["hc"]],
  ṙ: ["r", ["da"]],
  ŗ: ["r", ["cm"]],
  ȑ: ["r", ["gr", "gr"]],
  ȓ: ["r", ["bri"]],
  ṛ: ["r", ["db"]],
  ṝ: ["r", ["db", "mc"]],
  ṟ: ["r", ["lb"]],

  // s
  ś: ["s", ["ct"]],
  ṥ: ["s", ["ct", "da"]],
  ŝ: ["s", ["cr"]],
  š: ["s", ["hc"]],
  ṧ: ["s", ["hc", "da"]],
  ṡ: ["s", ["da"]],
  ş: ["s", ["cd"]],
  ṣ: ["s", ["db"]],
  ṩ: ["s", ["da", "db"]],
  ș: ["s", ["cm"]],
  ẛ: ["ſ", ["da"]],
  ʂ: ["s", ["hbl"]],
  
  // t 
  ť: ["t", ["ct"]],
  ẗ: ["t", ["dr"]],
  ṫ: ["t", ["da"]],
  ţ: ["t", ["cd"]],
  ṭ: ["t", ["db"]],
  ț: ["t", ["cm"]],
  ṱ: ["t", ["crb"]],
  ṯ: ["t", ["lb"]],
  ƫ: ["t", ["hbr"]],

  // u
  ú: ["u", ["ct"]],
  ù: ["u", ["gr"]],
  ŭ: ["u", ["br"]],
  û: ["u", ["cr"]],
  ǔ: ["u", ["hc"]],
  ů: ["u", ["gs"]],
  ü: ["u", ["dr"]],
  ǘ: ["u", ["dr", "ct"]],
  ǜ: ["u", ["dr", "gr"]],
  ǚ: ["u", ["dr", "hc"]],
  ǖ: ["u", ["dr", "mc"]],
  ű: ["u", ["ct", "ct"]],
  ũ: ["u", ["tl"]],
  ṹ: ["u", ["tl", "ct"]],
  ų: ["u", ["gnk"]],
  ū: ["u", ["mc"]],
  ṻ: ["u", ["mc", "dr"]],
  ủ: ["u", ["ha"]],
  ȕ: ["u", ["gr", "gr"]],
  ȗ: ["u", ["bri"]],
  ư: ["u", ["hr"]],
  ứ: ["u", ["hr", "ct"]],
  ừ: ["u", ["hr", "gr"]],
  ữ: ["u", ["hr", "tl"]],
  ử: ["u", ["hr", "ha"]],
  ự: ["u", ["hr", "db"]],
  ụ: ["u", ["db"]],
  ṳ: ["u", ["drb"]],
  ṷ: ["u", ["crb"]],
  ṵ: ["u", ["tlb"]],
  
  // v
  ṽ: ["v", ["tl"]],
  ṿ: ["v", ["db"]],
  // y
  ỳ: ["y", ["gr"]],
  ỵ: ["y", ["db"]],
  ỷ: ["y", ["ha"]],
  ỹ: ["y", ["tl"]],
} as ExtendedTable;

export { diaBaseAssociation };
