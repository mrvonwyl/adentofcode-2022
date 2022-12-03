import { data } from './day-1.data';
import { sortDesc, sum } from './util/array.util';

export function challenge1(): number {
  return data
    .split('\n\n')
    .map(sumCaloriesPerElf)
    .reduce((a, b) => {
      return Math.max(a, b);
    });
}

export default function challange2(): number {
  return data
    .split('\n\n')
    .map(sumCaloriesPerElf)
    .sort(sortDesc)
    .slice(0, 3)
    .reduce(sum, 0);
}

const sumCaloriesPerElf = (
  caloriesPerElf: string
): number => caloriesPerElf.split('\n').reduce(sum, 0);
