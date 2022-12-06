import { read } from './helpers';

// TODO move stuff

// [
//   '[M] [H]         [N]',
//   '[S] [W]         [F]     [W] [V]',
//   '[J] [J]         [B]     [S] [B] [F]',
//   '[L] [F] [G]     [C]     [L] [N] [N]',
//   '[V] [Z] [D]     [P] [W] [G] [F] [Z]',
//   '[F] [D] [C] [S] [W] [M] [N] [H] [H]',
//   '[N] [N] [R] [B] [Z] [R] [T] [T] [M]',
//   '[R] [P] [W] [N] [M] [P] [R] [Q] [L]',
//   ' 1   2   3   4   5   6   7   8   9'
// ]

const movesRegex = /move (\d+) from (\d+) to (\d+)/g;

function getResult9000(stackData: string, moves: string,) {
  const stacks = getStacks(stackData)

  for (const [_, count, from, to] of moves.matchAll(movesRegex)) {
    const removed = stacks[parseInt(from) - 1].splice(-count)
    stacks[parseInt(to) - 1].push(...removed.reverse())
  }

  return stacks.reduce((result, current) => result += current.at(-1), '')
}

function getResult9001(stackData: string, moves: string,) {
  const stacks = getStacks(stackData)

  for (const [_, count, from, to] of moves.matchAll(movesRegex)) {
    const removed = stacks[parseInt(from) - 1].splice(-count)
    stacks[parseInt(to) - 1].push(...removed)
  }

  return stacks.reduce((result, current) => result += current.at(-1), '');
}

(async () => {
  const data = await read(__filename)

  const [stackData, moves] = data.split('\n\n')

  const result1 = getResult9000(stackData, moves);
  const result2 = getResult9001(stackData, moves);

  console.log({ result1, result2 })
})()

function getStacks(stackData: string) {
  const rows = stackData.split('\n')
    .map((row) => row.match(/(\[[A-Z]]|   )+?( |\n|$)/g)) as Array<Array<string | undefined>>

  rows.pop()

  const columnCount = rows.reduce((prev: number, curr: Array<string>) => Math.max(prev, curr.length), 0)

  const result: Array<Array<string>> = [];

  for (let y = 0; y < columnCount; y++) {
    result[y] = []
    for (let x = 0, len = rows.length; x < len; x++) {
      const item = parse(rows[x][y])
      if (item !== undefined) {
        result[y].unshift(item);
      }
    }
  }

  return result;
}

function parse(item: string | undefined) {
  if (item === undefined) {
    return
  }

  item = item.replace(/\[(\D)]/g, '$1').trim();

  if (item === '') {
    return
  }

  return item
}
