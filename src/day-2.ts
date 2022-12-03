import { data2 } from './day-2.data';
import { sum } from './util/array.util';

// A X = Rock 1
// B Y = Paper 2
// C Z = Scissors 3

const victoryMap = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
  },
};

// X lose, Y draw, Z win
const desiredOutcomeMap = {
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

export function challenge1(): number {
  return data2
    .split('\n')
    .map(
      (signs) =>
        signs.split(' ') as [
          'A' | 'B' | 'C',
          'X' | 'Y' | 'Z'
        ]
    )
    .map(([theirSign, mySign]) => {
      let aggregator = 0;

      if (mySign === 'X') {
        aggregator = aggregator + 1;
      } else if (mySign === 'Y') {
        aggregator = aggregator + 2;
      } else if (mySign === 'Z') {
        aggregator = aggregator + 3;
      }

      aggregator =
        aggregator + victoryMap[theirSign][mySign];

      return aggregator;
    })
    .reduce(sum, 0);
}

export function challenge2(): number {
  return data2
    .split('\n')

    .map(
      (signs) =>
        signs.split(' ') as [
          'A' | 'B' | 'C',
          'X' | 'Y' | 'Z'
        ]
    )
    .map(([theirSign, desiredOutcome]) => {
      let aggregator = 0;

      if (desiredOutcome === 'X') {
        aggregator = aggregator + 0;
      } else if (desiredOutcome === 'Y') {
        aggregator = aggregator + 3;
      } else if (desiredOutcome === 'Z') {
        aggregator = aggregator + 6;
      }

      aggregator =
        aggregator +
        desiredOutcomeMap[theirSign][desiredOutcome];

      return aggregator;
    })
    .reduce(sum, 0);
}
