import { read } from './helpers';

// TODO https://adventofcode.com/2022/day/9

type Position = [number, number];
type Direction = 'U' | 'D' | 'R' | 'L';

(async () => {
//  const data = await read(__filename)

  const data = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
  `

  const moves = data.split('\n');

  let headPosition: Position = [0, 0];
  let tailPosition: Position = [0, 0];

  const snake: Array<Position> = Array.from({ length: 10 }, () => [0, 0])

  const uniqueStepsOfTail = new Set<string>();
  for (let move of moves) {
    const [direction, steps] = move.split(' ');

    for (let step = 0, len = parseInt(steps); step < len; step++) {

      let prev: Position = [...snake[0]];

      snake[0] = getPosition(direction, snake[0]);

      for (let tpIndex = 1, len = snake.length; tpIndex < len; tpIndex++) {
        if (isTouching(snake[tpIndex - 1], snake[tpIndex])) {
          console.log('Touch:', { tpIndex, snake });

          break;
        }
        const tmp: Position = [...snake[tpIndex]]
        snake[tpIndex]      = prev;
        prev                = tmp;
      }

      uniqueStepsOfTail.add(snake.at(-1)!.join(':'));
    }

    console.log('after move:', { move, snake });

  }
  console.log(uniqueStepsOfTail);
  console.log(uniqueStepsOfTail.size);

  let str = ''
  for (let y = 15, lenV = -5; y >= lenV; y--) {
    for (let x = -11, lenH = 14; x <= lenH; x++) {
      if (x === 0 && y === 0) {
        str += 's'
      } else {
        str += uniqueStepsOfTail.has(`${x}:${y}`) ? '#' : '.'
      }
    }
    str += '\n'
  }
  console.log(str);
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
