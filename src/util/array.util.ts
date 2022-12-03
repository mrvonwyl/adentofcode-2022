export const sortDesc = (a: number, b: number): number =>
  b - a;

export const sum = (
  a: number,
  b: string | number
): number => a + +b;

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
