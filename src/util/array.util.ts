export const sortDesc = (a: number, b: number): number =>
  b - a;

export const sum = (
  a: number,
  b: string | number
): number => a + +b;

export const max = (
  a: number,
  b: string | number
): number => Math.max(a, +b);

export const splitArrayIntoChunks = <T>(
  array: T[],
  chunkSize: number
): T[][] =>
  array.reduce((aggregator, element, index) => {
    if (index % chunkSize === 0) {
      aggregator.push([element]);
    } else {
      aggregator[aggregator.length - 1].push(element);
    }

    return aggregator;
  }, [] as T[][]);

[
  10047844, 10125625, 11766511, 13683830, 1623571, 1785843,
  1800548, 1967621, 1987744, 21756443, 2185741, 2193696,
  2360401, 2400077, 3148182, 3524192, 41609574, 41609574,
  4830726, 4848577, 5434276, 7155823,
].sort((a, b) => a - b);
