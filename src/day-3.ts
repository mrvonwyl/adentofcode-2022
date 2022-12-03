import { data } from './day-3.data';
import { splitArrayIntoChunks } from './util/array.util';
import { mapCharacterToIndex } from './util/string.utils';

export function challenge1(): number {
  return data
    .split('\n')
    .map((cs) => [
      cs.substring(0, cs.length / 2),
      cs.substring(cs.length / 2, cs.length),
    ])
    .map(([c1, c2]) => {
      return c1.split('').find((i) => c2.includes(i));
    })
    .filter((p): p is string => !!p)
    .map(mapCharacterToIndex)
    .reduce((a, b) => a + b, 0);
}

export function challenge2(): number {
  const r = splitArrayIntoChunks(data.split('\n'), 3)
    .map(([rucksack1, rucksack2, rucksack3]) => {
      return rucksack1
        .split('')
        .find(
          (item) =>
            rucksack2.includes(item) &&
            rucksack3.includes(item)
        );
    })
    .filter((i): i is string => !!i)
    .map(mapCharacterToIndex)
    .reduce((a, b) => a + b, 0);

  return r;
}
