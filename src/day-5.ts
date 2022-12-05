import { data1, data2 } from './day-5.data';

export function challenge1(): string {
  const stacks: string[][] = [];

  const containerRows = data1
    .split('\n')
    .map((line) => `${line} `)
    .filter((line) => !line.includes('1'))
    .map((line) => {
      return line
        .match(/.{1,4}/g)
        ?.map((container) => container.substring(1, 2));
    });

  containerRows.forEach((containerRow, rowIndex) => {
    containerRow?.forEach((container, colIndex) => {
      if (container !== ' ') {
        if (!stacks[colIndex]) {
          stacks[colIndex] = [];
        }

        stacks[colIndex].unshift(container);
      }
    });
  });

  const manipulatedStacks = data2
    .split('\n')
    .map((instructions) => {
      const matches =
        instructions.match(
          /move\s(\d*)\sfrom\s(\d*)\sto\s(\d*)/
        ) ?? [];

      return [+matches[1], +matches[2], +matches[3]];
    })
    .reduce((sta, [amount, from, to]) => {
      console.log('Stacks', sta);

      for (
        let colStack = 0;
        colStack < amount;
        colStack++
      ) {
        // console.log(`move ${amount} from ${from} to ${to}`);
        sta[to - 1].push(sta[from - 1].pop());
      }

      return sta;
    }, stacks);

  // console.log(containerRows);
  // console.log(manipulatedStacks);

  return manipulatedStacks
    .map((col) => col.pop())
    .reduce((a, b) => a.concat(b), '');
}

// export function challenge2(): number {
//   return data
//     .split('\n')
//     .map((pair) =>
//       pair
//         .split(',')
//         .map((sections) =>
//           sections.split('-').map((a) => +a)
//         )
//     )
//     .filter(([[s1, e1], [s2, e2]]) => {
//       const a = e1 >= s2 && s1 <= s2;
//       const b = e2 >= s1 && s2 <= s1;

//       return a || b;

//       // const firstContainsSecond = s1 <= s2 && e1 >= e2;
//       // const secondContainsFirst = s2 <= s1 && e2 >= e1;

//       // return firstContainsSecond || secondContainsFirst;
//     }).length;
// }
