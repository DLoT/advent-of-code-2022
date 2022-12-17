import { read } from './helpers';

// TODO https://adventofcode.com/2022/day/9

type Position = [number, number];
type Direction = 'U' | 'D' | 'R' | 'L';

(async () => {
  const data = await read(__filename)

  const moves = data.split('\n');

  let headPosition: Position = [0, 0];
  let tailPosition: Position = [0, 0];

  const uniqueStepsOfTail = new Set<string>(['0:0']);
  for (let move of moves) {
    const [direction, steps] = move.split(' ');

    for (let step = 0, len = parseInt(steps); step < len; step++) {
      const newHeadPosition = getPosition(direction, headPosition)

      if (isTouching(newHeadPosition, tailPosition) === false) {
        tailPosition = headPosition;
        uniqueStepsOfTail.add(tailPosition.join(':'));
      }

      headPosition = newHeadPosition;

    }
  }
  console.log(uniqueStepsOfTail.size);
})();

function getPosition(direction: string, position: Position): Position {
  const [x, y] = position;
  switch (direction as Direction) {
    case 'D':
      return [x, y - 1];
    case 'U':
      return [x, y + 1];
    case 'L':
      return [x - 1, y];
    case 'R':
      return [x + 1, y];
  }
}

function isTouching(head: Position, tail: Position): boolean {
  const [hx, hy] = head;
  const [tx, ty] = tail;

  return Math.abs(hx - tx) <= 1 && Math.abs(hy - ty) <= 1;
}

function isOverlapping(head: Position, tail: Position): boolean {
  const [hx, hy] = head;
  const [tx, ty] = tail;

  return hx - tx === 0 && hy - ty === 0
}
