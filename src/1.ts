import { data } from './1.data';

export function fn1_1(): number {
  return data
    .split('\n\n')
    .map((c) => c.split('\n').reduce((a, b) => +a + +b, 0))
    .reduce((a, b) => {
      return Math.max(a, b);
    });
}

export function fn1_2(): number {
  return data
    .split('\n\n')
    .map((elveCalories) =>
      elveCalories.split('\n').reduce((a, b) => +a + +b, 0)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);
}
