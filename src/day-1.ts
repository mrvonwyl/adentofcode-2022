import { data } from './day-1.data';

export function challenge1(): number {
  return data
    .split('\n\n')
    .map((c) => c.split('\n').reduce((a, b) => +a + +b, 0))
    .reduce((a, b) => {
      return Math.max(a, b);
    });
}

export default function challange2(): number {
  return data
    .split('\n\n')
    .map((c) => c.split('\n').reduce((a, b) => +a + +b, 0))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);
}
