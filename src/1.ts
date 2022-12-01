import { data } from './1.data';

export function fn1_1(): void {
  const result = data
    .split('\n\n')
    .map((elveCalories) =>
      elveCalories.split('\n').reduce((a, b) => +a + +b, 0)
    )
    .reduce((a, b) => {
      return Math.max(a, b);
    });

  console.log('1-1', result);
}

export function fn1_2(): void {
  const result = data
    .split('\n\n')
    .map((elveCalories) =>
      elveCalories.split('\n').reduce((a, b) => +a + +b, 0)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);

  console.log('1-2:', result);
}
