import { type Char } from '../type';
import punctuation from '../font/punctuation';

/**
 * Check if char is a punctuation mark
 *
 * @param Char char the char to check
 * @returns boolean true if it's a punctuation mark else false
 */
const isPuncChar = (char: Char) => punctuation.hasOwnProperty(char);

/**
 * Check if char is a consonant (usefull for create hyphenation)
 * @param Char char the char to check
 * @returns boolean true if it's a vowel else false
 */
const isConsonant = (char: Char) =>
  [
    ...'bḃḅḇʙƀɓƃ',
    ...'cćĉčċçḉȼƈɕ',
    ...'dďḋḑđḍḓḏðȸǳʣǆʥʤɖɗƌȡẟ',
    ...'fḟʩƒ',
    ...'gǵğĝǧġģḡɡɢǥɠʛɣ',
    ...'ƣhĥȟḧḣḩħḥḫẖʜƕɦɧ',
    ...'jĵǰȷɉʝɟʄ',
    ...'kḱǩķḳḵƙʞ',
    ...'lĺľļłḷḹḽḻŀǉỻʪʫʟƚɫɬɭȴɮƛʎ',
    ...'mḿṁṃɱ',
    ...'nńǹňñṅņṇṋṉǌɴɲƞɳȵŋ',
    ...'pṕṗƥɸqȹʠ',
    ...'ɋĸ',
    ...'rŕřṙŗȑȓṛṝṟʀɍɹɺɻɼɽɾɿʁ',
    ...'sśṥŝšṧṡşṣṩșſẛßʂȿẜẝʃƪʅʆ',
    ...'tťẗṫţṭțṱṯʨƾʦʧŧƫƭʈȶʇ',
    ...'vṽṿʋỽʌ',
    ...'wẃẁŵẘẅẇẉʍ',
    ...'xẍẋ',
    ...'yýỳŷẙÿỹẏȳỷỵʏɏƴỿȝ',
    ...'zźẑžżẓẕƍƶȥʐʑɀʒǯƹƺʓþƿƨƽƅɂʕʡʢʖʗʘʬʭ',
    ...'BḂḄḆɃƁƂ',
    ...'CĆĈČĊÇḈȻƇ',
    ...'DĎḊḐĐḌḒḎÐǱƉƊƋ',
    ...'FḞƑ',
    ...'GǴĞĜǦĠĢḠǤƓƔƢ',
    ...'HĤȞḦḢḨĦḤḪǶ',
    ...'JĴɈ',
    ...'KḰǨĶḲḴƘ',
    ...'LĹĽĻŁḶḸḼḺĿǇỺȽ',
    ...'MḾṀṂ',
    ...'NŃǸŇÑṄŅṆṊṈǊƝȠŊ',
    ...'PṔṖƤ',
    ...'QɊ',
    ...'RŔŘṘŖȐȒṚṜṞƦɌ',
    ...'SŚṤŜŠṦṠŞṢṨȘẞƩ',
    ...'TŤṪŢṬȚṰṮŦȾƬƮ',
    ...'VṼṾƲỼɅ',
    ...'WẂẀŴẄẆẈ',
    ...'XẌẊ',
    ...'YÝỲŶŸỸẎȲỶỴɎƳỾ',
    ...'ȜZŹẐŽŻẒẔƵȤⱿƷǮƸÞǷƧƼƄɁ',
  ].includes(char);

export { isPuncChar, isConsonant };
