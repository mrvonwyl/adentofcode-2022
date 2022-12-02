import { data2 } from './day-2.data';

export function challenge1(): number {
  return data2
    .split('\n')
    .map((x) => {
      // console.log(x);

      const p = x.split(' ');

      const a = p[0];
      const b = p[1];

      let aggre = 0;

      if (b === 'X') {
        aggre = aggre + 1;
      } else if (b === 'Y') {
        aggre = aggre + 2;
      } else if (b === 'Z') {
        aggre = aggre + 3;
      }

      if (
        (a === 'A' && b == 'X') ||
        (a === 'B' && b == 'Y') ||
        (a === 'C' && b == 'Z')
      ) {
        aggre = aggre + 3;
      }

      if (
        (a === 'A' && b === 'Y') ||
        (a === 'B' && b === 'Z') ||
        (a === 'C' && b === 'X')
      ) {
        aggre = aggre + 6;
      }

      // console.log(aggre);

      return aggre;
    })
    .reduce((a, b) => a + b, 0);
}

// A X =? Rock 1
// B Y = Paper 2
// C Z = Scissors 3

// X lose, Y draw, Z win

const datax = `A Y
B X
C Z`;

export function challenge2(): number {
  return data2
    .split('\n')
    .map((x) => {
      // console.log(x);

      const p = x.split(' ');

      const a = p[0];
      const b = p[1];

      let aggre = 0;

      if (b === 'X') {
        aggre = aggre + 0;
      } else if (b === 'Y') {
        aggre = aggre + 3;
      } else if (b === 'Z') {
        aggre = aggre + 6;
      }

      const map = {
        A: {
          X: 3,
          Y: 1,
          Z: 2,
        },
        B: {
          X: 1,
          Y: 2,
          Z: 3,
        },
        C: {
          X: 2,
          Y: 3,
          Z: 1,
        },
      };

      aggre = aggre + map[a as 'A' | 'B' | 'C'][b as 'X' | 'Y' | 'Z'];

      return aggre;
    })
    .reduce((a, b) => a + b, 0);
}
