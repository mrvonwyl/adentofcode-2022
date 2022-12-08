import { data7 } from './day-7.data';
import { sum } from './util/array.util';

export function challenge1(): number {
  const instructions = data7.split('\n');

  const fileSystem = cli(instructions);

  return filterDirectories(fileSystem);
}

export function challenge2(): number {
  const instructions = data7.split('\n');
  const fileSystem = cli(instructions);
  const totalSpace = 70000000;
  const usedSpace = fileSystem._;
  const freeSpace = totalSpace - usedSpace;
  const neededSpace = 30000000;
  const spaceToFreeUp = neededSpace - freeSpace;

  console.log('totalSpace: ', totalSpace);
  console.log('usedSpace: ', usedSpace);
  console.log('freeSpace: ', freeSpace);
  console.log('neededSpace: ', neededSpace);
  console.log('spaceToFreeUp: ', spaceToFreeUp);

  let aggregator = [];

  const values = findDirectory(
    fileSystem,
    spaceToFreeUp,
    aggregator
  );

  return values.reduce(
    (a, b) => Math.min(a, b),
    totalSpace
  );
}

function findDirectory(
  fileSystem: any,
  minSize: number,
  aggregator: number[]
): number[] {
  Object.entries<any>(fileSystem).forEach(([k, v]) => {
    // has size it is a directory, hence recurse
    if (v._) {
      findDirectory(v, minSize, aggregator);
    }

    if (k === '_' && v > minSize) {
      aggregator.push(v);
    }
  });

  return aggregator;
}

function filterDirectories(fileSystem: any): number {
  return Object.entries<any>(fileSystem)
    .map(([k, v]) => {
      if (v._) {
        return filterDirectories(v);
      }

      if (k === '_' && v <= 100000) {
        return v;
      } else {
        return 0;
      }
    })
    .reduce(sum, 0);
}

function cli(instructions: string[]): any {
  let fileSystem = {};

  for (
    let nextInstruction: string;
    (nextInstruction = instructions.shift());

  ) {
    if (nextInstruction === '$ cd ..') {
      return fileSystem;
    }

    if (nextInstruction.startsWith('$ cd')) {
      const dir = nextInstruction.substring(5);

      const innerFileSystem = cli(instructions);

      fileSystem = {
        ...fileSystem,
        _: (fileSystem['_'] ?? 0) + innerFileSystem['_'],
        [dir]: innerFileSystem,
      };
    }

    if (!isNaN(+nextInstruction.substring(0, 1))) {
      const [size, file] = nextInstruction.split(' ');

      fileSystem = {
        ...fileSystem,
        _: (fileSystem['_'] ?? 0) + +size,
        [file]: +size,
      };
    }
  }

  return fileSystem;
}
