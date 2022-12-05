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
      // console.log('Stacks', sta);

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

export function challenge2(): string {
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

  console.log('Stacks', stacks);

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
      console.log(`move ${amount} from ${from} to ${to}`);

      if (amount > 1) {
        console.log('Move many', amount);

        sta[to - 1].push(
          ...sta[from - 1].splice(amount * -1)
        );
      } else {
        console.log('Move one', amount);
        sta[to - 1].push(sta[from - 1].pop());
      }

      console.log(stacks);
      console.log('_________________');

      return sta;
    }, stacks);

  // console.log(containerRows);
  // console.log(manipulatedStacks);

  return manipulatedStacks
    .map((col) => col.pop())
    .reduce((a, b) => a.concat(b), '');
}
