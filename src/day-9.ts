import { Logger } from './util/logger';

const tdata9 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

type Direction = 'U' | 'D' | 'L' | 'R';

type Index = { x: number; y: number };

export function challenge1(): number {
  const instructions = sanitizeInstructions(tdata9);

  const ropeBridge = new RopeBridge(instructions, 2);

  return ropeBridge.moveAll();
}

// export function challenge1(): number {
//   const instructions = sanitizeInstructions(data9);

//   const ropeBridge = new RopeBridge(instructions, 10);

//   return ropeBridge.moveAll();
// }

class RopeBridge {
  private logger = new Logger();

  private headIndex: Index = { x: 0, y: 0 };
  private tailIndex: Index = { x: 0, y: 0 };

  private indices: Index[] = [];

  private directionMap: {
    [key in Direction]: (Index) => Index;
  } = {
    U: ({ x, y }) => ({ x, y: y + 1 }),
    D: ({ x, y }) => ({ x, y: y - 1 }),
    L: ({ x, y }) => ({ x: x - 1, y }),
    R: ({ x, y }) => ({ x: x + 1, y }),
  };

  private visitedTailIndices: Set<string> = new Set();

  constructor(
    private instructions: Direction[],
    ropeLength: number
  ) {
    this.logger.log(
      'Instruction Count: ',
      instructions.length
    );

    for (let i = 0; i < ropeLength; i++) {
      this.indices.push({ x: 0, y: 0 });
    }

    this.logCurrentState();
  }

  moveAll(): number {
    while (this.instructions.length > 0) {
      this.move();
    }

    return this.visitedTailIndices.size;
  }

  move() {
    const direction = this.instructions.shift();

    this.logger.log('Move: ', direction);

    const newHeadIndex = this.calculateNewHeadIndex(
      direction,
      this.headIndex
    );

    this.headIndex = newHeadIndex;

    const newTailIndex = this.calculateNewTailIndex(
      newHeadIndex,
      this.tailIndex
    );

    this.tailIndex = newTailIndex;

    this.logCurrentState();

    this.trackState(this.tailIndex);
  }

  private trackState({ x, y }: Index): void {
    const value = `x:${x},y:${y}`;

    this.visitedTailIndices.add(value);
  }

  private logCurrentState(): void {
    this.logger.log('\tIndices: ', this.indices);
  }

  private calculateNewHeadIndex(
    direction: Direction,
    headIndex: Index
  ): Index {
    return this.directionMap[direction](headIndex);
  }

  private calculateNewTailIndex(
    relativeIndex: Index,
    currentIndex: Index
  ): Index {
    const { x: hX, y: hY } = relativeIndex;
    const { x: tX, y: tY } = currentIndex;

    const xDifference = hX - tX;
    const yDifference = hY - tY;

    let moves: Direction[] = [];

    this.logger.log('\txd, yd: ', xDifference, yDifference);

    if (
      xDifference > 1 ||
      (xDifference === 1 && Math.abs(yDifference) > 1)
    ) {
      // move right
      moves.push('R');
    } else if (
      xDifference < -1 ||
      (xDifference === -1 && Math.abs(yDifference) > 1)
    ) {
      // move left
      moves.push('L');
    }

    if (
      yDifference > 1 ||
      (yDifference === 1 && Math.abs(xDifference) > 1)
    ) {
      // move up
      moves.push('U');
    } else if (
      yDifference < -1 ||
      (yDifference === -1 && Math.abs(xDifference) > 1)
    ) {
      // move down
      moves.push('D');
    }

    this.logger.log('\tTailMoves: ', moves);

    if (moves.length > 0) {
      return moves.reduce(
        (intermediaryTailIndex, direction) =>
          this.directionMap[direction](
            intermediaryTailIndex
          ),
        currentIndex
      );
    }

    return currentIndex;
  }
}

function sanitizeInstructions(data: string): Direction[] {
  return data
    .split('\n')
    .map((i) => {
      const [direction, amount] = i.split(' ');

      return {
        direction: direction as Direction,
        amount: +amount,
      };
    })
    .reduce((allInstructions, { direction, amount }) => {
      for (let i = 0; i < amount; i++) {
        allInstructions.push(direction);
      }

      return allInstructions;
    }, []);
}

const data9 = `L 2
R 2
U 1
R 2
U 2
D 2
U 1
L 1
U 1
L 1
D 1
U 1
L 1
R 1
L 2
D 2
R 1
L 2
D 2
L 2
U 1
D 2
R 1
D 1
U 1
D 1
U 2
L 1
U 2
R 1
D 2
L 1
D 1
U 1
L 1
R 1
L 1
U 2
L 1
U 1
L 2
R 2
D 2
U 2
R 1
U 1
D 2
L 1
U 1
D 2
U 1
L 2
U 1
D 2
U 2
L 1
D 2
L 1
U 1
D 1
U 1
D 2
R 2
U 1
L 1
R 2
D 2
R 1
L 1
R 1
D 1
U 1
L 2
U 1
L 1
R 1
D 2
U 1
L 1
D 2
R 2
D 1
U 1
R 2
U 1
D 1
R 2
D 1
R 1
U 2
D 1
L 2
U 2
R 1
L 1
R 2
U 2
L 2
U 2
D 1
U 1
D 2
R 2
U 2
R 1
D 1
R 2
U 2
D 2
U 1
R 1
U 2
D 3
R 1
L 1
D 3
U 3
L 3
D 2
U 3
D 1
R 2
D 2
L 1
U 3
R 1
U 1
R 3
D 1
L 3
R 1
U 1
L 2
D 2
L 1
U 2
D 1
L 2
D 1
U 1
R 2
D 2
U 2
D 1
L 1
R 2
U 3
D 3
U 2
L 1
D 1
U 2
R 3
U 1
D 1
U 3
R 2
U 3
D 2
U 1
R 1
U 2
R 2
U 1
L 1
U 3
L 2
R 1
U 2
D 3
L 1
U 3
D 3
U 3
L 1
D 2
L 2
R 2
D 3
R 3
D 2
R 2
D 3
U 3
R 1
D 3
U 2
R 3
D 2
R 3
U 1
R 2
D 2
U 3
D 3
R 1
U 3
D 1
U 3
D 3
R 2
U 2
D 1
R 3
D 2
U 3
L 1
R 3
L 2
U 1
L 2
U 1
R 1
U 2
R 3
D 2
U 1
L 3
D 2
L 2
D 3
R 1
U 1
R 1
D 1
L 3
D 2
L 3
D 4
R 2
D 4
L 1
D 4
U 2
R 2
U 3
L 4
D 1
R 1
L 4
U 1
D 3
L 2
R 3
U 1
R 2
U 4
D 1
L 2
R 2
D 4
L 2
D 2
R 1
D 2
L 1
U 4
L 3
U 3
R 4
L 3
U 2
D 3
U 2
D 1
L 2
R 1
L 1
R 1
D 3
L 2
D 3
U 2
L 2
R 1
L 2
D 2
R 1
U 3
D 2
L 1
D 2
U 1
L 1
R 1
D 3
U 2
L 4
U 3
R 4
L 2
D 4
R 3
D 4
U 3
R 3
D 3
R 1
U 1
D 2
U 4
D 4
U 3
D 1
L 4
R 2
L 2
U 3
R 2
D 1
R 3
D 1
L 3
R 2
D 1
L 3
U 3
R 4
U 1
L 2
D 3
R 2
U 2
D 4
U 4
D 4
R 3
D 1
U 4
D 3
R 4
U 1
D 2
L 5
R 3
U 1
L 1
D 4
R 3
U 1
R 3
D 5
R 5
D 2
U 2
L 5
R 2
U 1
L 4
R 4
U 3
D 3
U 1
R 4
U 4
R 4
U 3
D 1
L 1
U 2
R 3
L 5
R 3
D 1
R 2
U 1
L 2
D 5
L 2
D 2
U 4
D 2
R 3
L 5
U 4
D 1
L 3
D 4
L 1
D 4
R 2
D 2
R 3
U 2
D 1
R 1
D 4
R 1
D 5
U 4
D 4
R 1
U 2
D 2
L 2
R 1
L 1
D 5
R 4
D 2
U 3
L 1
U 3
L 4
D 5
R 4
U 3
D 1
U 4
L 2
D 5
L 4
R 4
U 4
L 3
U 5
L 1
R 2
L 1
R 1
L 4
R 3
D 3
U 3
L 3
D 4
R 1
L 2
D 4
U 3
L 5
D 1
L 2
U 2
R 2
L 3
R 4
D 4
U 3
D 5
L 3
U 2
L 2
U 2
R 4
L 1
R 6
D 3
R 6
U 1
L 3
R 4
U 3
L 6
R 1
D 3
R 4
D 3
L 1
U 1
D 3
R 2
L 4
U 2
L 2
U 4
D 3
L 5
D 4
L 4
R 2
D 4
L 2
R 5
U 3
D 2
L 1
R 5
D 1
U 1
R 6
L 1
U 4
D 2
R 4
D 5
R 3
U 5
D 1
R 1
D 1
U 6
R 3
U 6
L 3
R 6
D 1
U 1
D 4
U 1
R 1
D 2
U 5
L 5
U 1
L 5
R 5
U 3
R 5
U 4
L 4
U 3
D 5
R 6
L 1
U 3
R 6
L 1
U 6
R 1
L 1
D 3
L 5
R 6
U 2
R 5
U 5
D 5
R 3
U 2
L 6
D 5
L 4
U 5
D 3
U 4
R 3
D 6
U 4
R 4
U 5
L 3
U 5
R 4
L 4
U 3
L 1
R 6
L 4
U 6
D 1
R 4
U 4
L 5
U 3
D 6
L 3
U 1
L 3
R 5
L 5
R 7
D 3
L 4
R 7
U 1
D 2
R 7
U 6
L 2
D 7
L 4
U 4
L 7
D 4
R 7
D 1
U 7
R 4
D 7
U 4
D 4
R 3
L 4
U 3
L 6
D 4
U 1
R 1
U 1
L 7
D 1
U 3
L 3
R 5
U 6
R 5
U 5
L 1
U 5
R 7
D 1
L 6
R 2
L 5
U 3
D 2
U 1
L 2
R 7
U 3
D 6
U 3
D 7
U 2
D 1
U 5
D 2
L 2
U 5
R 1
D 5
U 6
D 5
U 5
L 1
R 7
L 4
U 3
L 7
R 2
L 7
R 5
D 3
L 5
R 2
U 6
L 3
D 6
U 5
L 1
D 7
U 3
L 2
U 7
D 7
R 2
L 1
U 7
L 1
U 3
R 6
D 6
R 6
D 7
L 5
D 4
U 4
D 5
R 5
D 2
R 7
L 4
U 7
R 2
U 3
L 2
R 6
U 8
R 6
D 6
L 7
D 6
L 1
D 4
U 1
D 8
U 8
L 5
R 8
D 1
R 6
U 5
R 3
L 4
D 5
L 2
D 8
U 3
L 7
U 4
D 8
R 6
U 4
L 7
D 8
L 3
U 7
R 1
U 2
R 5
D 2
R 2
U 6
D 1
R 6
L 8
U 5
R 7
U 1
R 5
L 7
D 4
L 7
U 8
L 8
R 4
L 1
D 6
L 6
U 7
L 5
D 1
U 3
R 8
D 2
R 3
L 7
U 5
R 6
L 2
D 2
R 5
L 4
D 1
U 4
L 4
R 7
U 6
D 7
R 1
L 8
D 3
L 7
U 3
R 3
U 1
D 7
R 7
L 7
U 7
L 5
D 1
R 8
U 3
D 1
U 6
R 7
D 6
L 3
D 5
R 8
L 1
U 3
R 2
U 1
R 2
D 5
R 4
L 1
D 4
U 5
R 8
U 2
L 4
R 6
D 1
U 7
D 8
R 1
L 1
U 4
L 2
U 7
D 2
R 7
D 9
U 7
L 1
D 8
R 3
L 1
R 3
U 5
L 5
D 7
U 3
R 4
U 5
L 2
R 2
D 7
R 2
U 4
L 9
R 7
U 6
R 4
U 8
L 2
R 7
U 5
L 6
R 7
U 7
L 4
D 2
L 1
D 4
R 5
U 2
L 3
R 9
U 8
D 5
L 3
U 1
L 2
D 5
L 7
D 7
U 1
L 2
D 8
R 9
L 5
D 8
U 1
L 7
U 9
R 1
L 1
D 3
R 3
U 6
L 4
R 6
L 1
R 6
U 2
R 9
D 3
R 6
U 5
R 9
L 7
D 6
L 9
D 8
R 4
L 3
U 2
R 7
L 5
D 7
U 8
R 5
L 2
D 8
L 4
R 3
D 1
U 3
D 3
U 3
D 3
R 2
L 5
R 9
L 5
U 9
R 3
D 9
L 4
U 3
L 2
R 1
D 1
R 6
D 4
L 6
R 1
D 8
L 3
R 2
D 7
U 2
L 4
R 10
L 9
R 4
L 2
U 10
R 5
D 4
L 7
U 5
L 7
U 7
D 6
U 7
R 5
L 5
D 5
R 10
D 4
L 3
D 4
U 8
L 5
U 5
L 8
R 3
U 5
D 6
L 2
R 1
L 7
U 8
R 2
L 5
R 1
D 2
U 1
L 1
R 5
U 6
D 6
R 2
U 8
L 1
D 8
L 5
R 10
U 7
R 9
D 4
L 4
U 6
D 3
R 3
L 5
R 3
U 6
R 10
U 5
L 6
R 2
D 9
U 2
D 4
U 3
D 2
U 7
L 1
R 3
L 10
U 7
R 7
U 2
R 5
L 3
D 4
R 1
D 3
L 3
R 6
D 6
R 3
L 9
R 3
L 1
D 8
R 9
U 2
D 6
U 2
L 9
U 8
D 2
L 1
U 2
D 10
U 7
R 8
D 4
L 7
U 1
D 1
U 1
L 5
D 5
L 10
R 9
U 5
L 8
D 2
R 2
L 8
D 8
L 11
U 5
L 11
D 9
L 10
U 1
D 9
R 5
U 4
D 2
R 3
L 7
D 7
L 9
R 3
L 3
U 7
R 1
U 4
R 7
D 10
L 8
U 2
L 6
R 1
U 10
D 3
U 2
L 4
D 5
R 6
L 7
R 8
L 4
U 1
D 11
U 5
R 4
L 9
R 8
L 2
R 4
U 10
D 4
R 7
D 3
U 6
D 6
U 3
L 11
R 4
D 6
U 9
R 10
D 8
U 3
R 2
U 7
D 5
R 10
U 5
R 3
U 9
L 2
D 3
U 1
L 10
U 2
L 3
U 10
L 6
D 4
L 1
D 1
U 3
L 10
R 6
L 1
U 2
R 1
L 9
D 4
L 11
U 6
D 3
L 9
U 7
D 3
U 3
R 8
U 11
R 2
D 1
U 3
R 2
L 7
D 5
R 10
U 1
D 10
L 1
U 10
D 11
U 5
R 6
D 6
R 10
L 9
D 3
U 4
L 12
D 7
R 9
U 4
D 10
L 11
U 1
R 3
U 6
L 11
U 10
R 3
U 4
L 9
U 4
L 12
U 4
D 2
L 12
D 12
L 5
U 9
R 7
D 12
L 2
U 3
R 7
D 9
L 2
R 9
D 10
U 6
R 10
D 8
R 8
L 9
U 11
R 5
D 7
U 3
R 7
U 10
R 5
D 4
U 3
D 6
R 11
U 9
L 3
D 5
R 6
L 11
D 5
R 2
D 2
R 8
D 1
U 5
L 3
U 8
L 10
D 7
R 12
D 7
L 8
D 5
U 9
D 10
L 4
R 6
L 9
R 10
L 11
U 8
D 8
R 2
L 5
U 9
R 1
L 12
D 6
R 11
L 4
R 6
U 12
D 5
U 4
L 7
D 2
R 5
U 5
D 7
R 10
L 9
U 4
D 11
U 12
D 6
U 4
L 3
U 4
R 11
D 7
L 11
R 9
U 2
R 7
D 5
U 13
L 10
U 9
L 9
U 4
D 8
R 7
L 8
U 3
L 1
U 6
D 11
U 11
D 12
L 13
U 13
R 8
D 4
U 6
D 3
U 9
R 11
D 6
R 9
D 1
U 8
D 9
R 2
U 3
R 13
D 7
U 6
D 10
U 13
D 4
U 1
R 10
D 9
U 8
D 7
U 7
L 13
R 10
L 8
D 7
U 9
R 8
L 8
U 3
D 5
L 1
U 5
D 9
R 2
D 8
L 7
U 2
R 11
U 9
D 7
L 2
D 9
R 8
L 12
R 4
D 7
U 2
L 8
U 12
D 11
R 9
U 9
R 13
U 3
L 9
U 9
R 5
U 10
R 13
U 6
D 4
U 2
R 7
D 3
R 1
L 4
R 9
L 3
D 6
L 9
R 6
D 1
L 6
D 5
U 10
R 2
L 1
R 1
L 1
U 9
D 5
U 2
D 12
L 9
U 1
L 14
U 9
L 11
R 11
L 3
D 5
U 5
D 8
L 9
U 12
R 11
L 1
D 9
R 9
L 7
D 7
U 4
D 5
L 11
D 9
R 13
D 3
R 9
D 6
U 12
L 2
D 10
L 6
U 12
R 2
D 9
R 2
D 12
R 14
U 3
R 3
D 12
R 13
U 1
D 11
L 1
D 9
U 11
R 9
D 10
L 7
D 13
R 10
D 2
U 7
L 7
R 14
D 10
R 9
D 13
L 7
U 5
R 4
D 4
R 3
U 8
D 8
R 4
U 14
R 8
U 12
D 6
L 11
D 12
U 13
L 13
U 8
L 2
R 7
U 1
L 14
R 1
D 1
L 9
U 1
R 8
U 7
D 13
U 1
D 5
L 8
R 13
L 1
U 14
L 11
D 7
R 7
L 8
U 8
D 9
U 14
L 1
U 7
D 7
L 12
D 7
L 4
U 14
R 2
D 3
U 9
L 9
D 13
U 9
D 5
U 11
D 6
U 10
L 10
R 8
D 11
L 3
R 6
D 10
R 11
L 3
D 15
R 6
D 12
U 4
R 5
L 15
D 9
L 5
U 12
R 2
D 14
U 10
L 1
U 14
L 5
D 12
U 11
D 6
L 12
R 2
D 9
L 15
D 6
L 3
U 6
L 8
R 6
L 11
U 12
L 2
R 12
U 15
D 15
U 1
L 4
R 3
D 9
U 9
D 2
U 2
R 6
U 1
L 4
R 5
L 8
R 2
U 6
D 13
R 12
L 13
D 3
L 9
U 5
R 5
D 3
R 8
L 7
R 12
L 11
U 9
L 4
D 9
U 13
R 15
D 13
U 12
R 1
L 14
R 5
L 8
U 6
D 5
U 6
D 7
U 14
D 4
R 6
L 7
U 4
L 12
D 7
U 11
L 3
R 4
U 4
L 9
U 10
R 9
D 15
R 9
D 6
L 4
U 2
L 5
R 9
L 8
R 2
D 5
U 8
D 11
L 10
R 1
U 10
L 10
U 8
L 8
R 16
U 9
D 5
L 8
D 3
L 5
R 3
U 7
R 9
U 3
D 5
U 11
R 5
L 7
D 3
R 15
U 8
R 12
U 1
D 1
R 12
L 15
D 5
R 5
U 12
R 11
L 7
U 13
L 9
R 14
U 13
D 15
R 15
D 9
U 3
L 15
D 15
U 8
L 2
U 4
D 5
L 10
R 5
D 15
U 15
L 11
U 7
L 3
D 6
L 9
D 9
U 11
L 9
U 2
R 14
L 13
U 8
D 13
R 5
U 5
L 5
U 15
D 8
U 15
R 3
U 12
L 3
D 9
U 12
D 10
R 6
L 16
D 14
L 10
R 11
U 9
R 3
U 15
L 10
U 14
L 1
D 13
R 4
U 8
R 10
D 2
U 1
L 2
D 9
R 10
L 15
D 7
R 5
D 12
L 1
R 8
D 14
U 4
D 11
R 12
L 3
D 6
U 6
D 12
L 15
U 4
L 3
R 10
L 9
D 5
R 17
U 12
R 2
L 2
D 15
U 4
R 4
L 17
R 8
U 12
R 1
L 3
D 1
R 7
L 13
U 14
D 1
U 5
L 2
R 5
L 9
U 6
D 5
R 14
U 11
D 7
L 10
D 10
L 17
R 2
U 9
D 7
L 15
R 8
D 16
L 15
D 8
L 4
U 4
D 5
R 4
D 15
L 8
D 11
L 5
U 5
D 4
R 14
U 16
R 8
L 2
R 16
L 5
U 15
D 13
L 5
U 5
D 6
R 1
L 4
R 4
U 6
D 11
L 8
R 9
U 8
R 10
U 1
L 13
R 10
L 8
D 11
U 9
L 7
U 5
L 15
D 5
R 3
D 16
L 2
U 12
R 15
U 9
L 13
U 15
L 4
U 3
R 3
L 13
D 5
U 16
R 5
D 5
U 9
L 7
U 10
D 1
R 2
U 14
L 13
U 1
L 12
U 10
D 3
U 1
R 14
D 14
U 16
R 6
U 14
D 5
L 18
D 18
U 8
L 2
R 5
D 17
U 18
R 2
L 10
D 6
R 17
L 10
U 1
R 8
L 14
U 10
R 7
L 16
U 9
D 13
U 2
L 1
D 14
U 15
R 15
D 2
R 13
D 3
R 9
D 18
R 16
L 1
R 3
U 1
R 1
U 16
D 17
U 1
D 11
R 11
D 1
U 5
R 1
L 1
R 10
D 5
R 1
D 15
R 14
L 5
U 12
L 8
R 6
D 8
L 5
D 11
L 14
D 5
R 15
L 16
R 12
L 10
D 8
L 3
R 1
D 10
U 13
D 7
U 10
L 13
D 8
R 7
L 13
R 4
L 9
U 6
D 14
L 16
D 18
R 13
U 13
L 17
R 5
U 9
R 11
D 18
R 16
L 4
D 8
R 18
L 14
R 11
D 14
R 2
D 6
L 12
D 3
U 3
L 4
D 7
L 4
D 6
L 12
D 9
L 2
R 16
L 12
U 4
L 12
U 4
R 17
L 8
U 8
R 11
U 14
D 15
L 19
R 1
L 16
R 3
U 15
R 5
L 1
D 17
L 13
U 14
D 9
U 3
L 7
R 11
D 7
R 15
L 6
U 17
R 17
D 17
U 18
L 1
R 8
L 7
D 9
L 5
D 1
R 2
D 16
U 18
D 7
U 13
L 10
U 15
R 18
U 7
L 9
R 6
U 18
R 9
D 8
L 6
R 7
L 11
U 12
R 7
D 4
U 8
R 16
U 17
D 4
U 10
L 19
D 14
L 12
R 18
D 4
R 9
U 12
R 14
U 9
L 16
D 14
U 7
R 14
L 19
U 16
L 18
U 1
R 19
D 7
R 6
U 12
L 16
R 16
U 16
L 6
R 18
L 19
U 10
D 15
U 7
D 1
U 7
L 12
U 4
R 5
U 12
R 18
D 15
U 4
L 8
U 18
D 18
L 3
R 19
L 15
R 11
U 1
R 6
L 8
R 1
L 3`;
