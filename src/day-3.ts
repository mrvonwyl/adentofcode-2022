import { data } from './day-3.data';

const tdata = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

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
    .map((p) => {
      const pos = p.charCodeAt(0);

      if (p.charCodeAt(0) <= 90) {
        return pos - 38;
      } else {
        return pos - 96;
      }
    })
    .reduce((a, b) => a + b, 0);
}

export function challenge2(): number {
  const r = data
    .split('\n')
    .reduce((ag, e, i) => {
      if (i % 3 === 0) {
        ag.push([e]);
      } else {
        ag[ag.length - 1].push(e);
      }

      return ag;
    }, [] as string[][])
    .map(([r1, r2, r3]) => {
      return r1.split('').find((i) => r2.includes(i) && r3.includes(i));
    })
    .filter((i): i is string => !!i)
    .map((p) => {
      const pos = p.charCodeAt(0);

      if (p.charCodeAt(0) <= 90) {
        return pos - 38;
      } else {
        return pos - 96;
      }
    })
    .reduce((a, b) => a + b, 0);

  console.log(r);

  return r;

  // .map(([c1, c2]) => {
  //   return c1.split('').find((i) => c2.includes(i));
  // })
  // .filter((p): p is string => !!p)
  // .map((p) => {
  //   const pos = p.charCodeAt(0);

  //   if (p.charCodeAt(0) <= 90) {
  //     return pos - 38;
  //   } else {
  //     return pos - 96;
  //   }
  // })
  // .reduce((a, b) => a + b, 0);
}
