import { data } from './day-4.data';

export function challenge1(): number {
  return data
    .split('\n')
    .map((pair) =>
      pair
        .split(',')
        .map((sections) =>
          sections.split('-').map((a) => +a)
        )
    )
    .filter(([[s1, e1], [s2, e2]]) => {
      const firstContainsSecond = s1 <= s2 && e1 >= e2;
      const secondContainsFirst = s2 <= s1 && e2 >= e1;

      return firstContainsSecond || secondContainsFirst;
    }).length;
}

export function challenge2(): number {
  return data
    .split('\n')
    .map((pair) =>
      pair
        .split(',')
        .map((sections) =>
          sections.split('-').map((a) => +a)
        )
    )
    .filter(([[s1, e1], [s2, e2]]) => {
      const a = e1 >= s2 && s1 <= s2;
      const b = e2 >= s1 && s2 <= s1;

      return a || b;

      // const firstContainsSecond = s1 <= s2 && e1 >= e2;
      // const secondContainsFirst = s2 <= s1 && e2 >= e1;

      // return firstContainsSecond || secondContainsFirst;
    }).length;
}
