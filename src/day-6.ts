import { data6_1 } from './day-6.data';

export function challenge1(): number {
  const data = data6_1;

  let index = 0;
  let result;

  const characters = data.split('');

  while (index + 3 < characters.length) {
    const a = characters[index];
    const b = characters[index + 1];
    const c = characters[index + 2];
    const d = characters[index + 3];

    if (
      a !== b &&
      a !== c &&
      a !== d &&
      b !== c &&
      b !== d &&
      c !== d
    ) {
      result = index + 4;
      break;
    }

    index++;
  }

  return result;
}

export function challange2(): number {
  const data = data6_1;

  let index = 0;
  let result;

  while (index + 13 < data.length) {
    const substring = data
      .substring(index, index + 14)
      .split('');

    if (isUnique(substring)) {
      result = index + 14;
      break;
    }

    index++;
  }

  return result;
}

const isUnique = (arrToTest) => {
  console.log(arrToTest);

  return arrToTest.length === new Set(arrToTest).size;
};
