import { Font, Glyph, DiaGroup } from '../../type';
import { topDiaCount, moveDia, joinVector } from '../diacritics/utility';

/**
 * Used to move diacritics from their default
 * positions when there are several above the letter
 *
 * @param DiaGroup diakeys : an array of diacritics key properties of
 * {@link https://github.com/nclslbrn/plot-writer/blob/main/src/font/diacritics/glyphs}
 * @param Font diacritics : an object that contains all diacritic path
 * @return Glyph a new glyph (merge of a base letter and one or multiple diacritics)
 */
const mergeDiacritics = (diaKeys: DiaGroup, diacritics: Font): Glyph => {
  // check if theres is two diacritics and
  // both are situated on top of letter
  const multipleTopDia = diaKeys.reduce(
    (acc: number, dia: keyof Font) => (acc += topDiaCount(dia)),
    0
  );
  if (diaKeys.length > 1 && multipleTopDia > 1) {
    // double grave move first one on left and second on right
    if (
      diaKeys.reduce(
        (ct: number, k: keyof Font) => (ct += k === 'gr' ? 1 : 0),
        0
      ) > 1
    ) {
      return joinVector(
        diaKeys.filter((k) => k != 'gr').map((k) => diacritics[k]),
        [...moveDia.lf(diacritics['gr']), ...moveDia.rg(diacritics['gr'])]
      );
    }

    // double acute move first one on left and second on right
    else if (
      diaKeys.reduce(
        (ct: number, k: keyof Font) => (ct += k === 'ct' ? 1 : 0),
        0
      ) > 1
    ) {
      return joinVector(
        diaKeys.filter((k) => k != 'ct').map((k) => diacritics[k]),
        [...moveDia.lf(diacritics['ct']), ...moveDia.rg(diacritics['ct'])]
      );
    }

    // move tild down
    else if (diaKeys.includes('tl')) {
      return joinVector(
        diaKeys.filter((k) => k != 'tl').map((k) => diacritics[k]),
        moveDia.bt(diacritics['tl'])
      );
    }

    // move circumflex down
    else if (diaKeys.includes('cr')) {
      return joinVector(
        diaKeys
          .filter((k) => k != 'cr')
          .map((k) => (k == 'ha' ? moveDia.tp(diacritics[k]) : diacritics[k])),
        moveDia.bt(diacritics['cr'])
      );
    }

    // move breve down
    else if (diaKeys.includes('br')) {
      return joinVector(
        diaKeys
          .filter((k) => k != 'br')
          .map((k) => (k == 'ha' ? moveDia.tp(diacritics[k]) : diacritics[k])),
        moveDia.bt(diacritics['br'])
      );
    }

    // move hacek down
    else if (diaKeys.includes('hc')) {
      return joinVector(
        diaKeys.filter((k) => k != 'hc').map((k) => diacritics[k]),
        moveDia.bt(diacritics['hc'])
      );
    }

    // move macron down
    else if (diaKeys.includes('mc')) {
      return joinVector(
        diaKeys.filter((k) => k != 'mc').map((k) => diacritics[k]),
        moveDia.bt(diacritics['mc'])
      );
    }

    // move angstorm down
    else if (diaKeys.includes('gs')) {
      return joinVector(
        diaKeys.filter((k) => k != 'gs').map((k) => diacritics[k]),
        moveDia.bt(diacritics['gs'])
      );
    } else {
      return diaKeys.reduce(
        (acc: Glyph, k: keyof Font) => [...acc, ...diacritics[k]],
        [] as Glyph
      );
    }
  } else {
    return diaKeys.reduce(
      (acc: Glyph, k: keyof Font) => [...acc, ...diacritics[k]],
      [] as Glyph
    );
  }
};

export { mergeDiacritics };
