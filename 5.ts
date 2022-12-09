import { read } from './helpers';

// TODO move crates
// https://adventofcode.com/2022/day/5

const movesRegex = /move (\d+) from (\d+) to (\d+)/g;

(async () => {
  const data = await read(__filename)

  const [stackData, moves] = data.split('\n\n')

  const result1 = getResult1(stackData, moves);
  const result2 = getResult2(stackData, moves);

  console.log({ result1, result2 })
})()

function getResult1(stackData: string, moves: string,) {
  const stacks = getStacks(stackData);

  for (const [_, count, from, to] of moves.matchAll(movesRegex)) {
    const removed = stacks[parseInt(from) - 1].splice(-count).reverse();
    stacks[parseInt(to) - 1].push(...removed);
  }

  return stacks.reduce((result, current) => result + current.at(-1), '');
}

function getResult2(stackData: string, moves: string) {
  const stacks = getStacks(stackData);

  for (const [_, count, from, to] of moves.matchAll(movesRegex)) {
    const removed = stacks[parseInt(from) - 1].splice(-count);
    stacks[parseInt(to) - 1].push(...removed);
  }

  return stacks.reduce((result, current) => result + current.at(-1), '');
}

function getStacks(stackData: string) {
  const rows = stackData.split('\n')
    .map((row) => row.match(/(\[[A-Z]]| {3})+?( |\n|$)/g)) as Array<Array<string>>;

  // Remove column number row
  rows.pop();

  const columnCount = rows.reduce((prev: number, curr: Array<string | undefined>) => Math.max(prev, curr.length), 0);

  const result: Array<Array<string>> = [];

  for (let y = 0; y < columnCount; y++) {
    result[y] = []
    for (let x = 0, len = rows.length; x < len; x++) {
      const item = parse(rows[x][y]);
      if (item !== undefined) {
        result[y].unshift(item);
      }
    }
  }

  return result;
}

function parse(item: string | undefined) {
  if (item === undefined) {
    return;
  }

  item = item.replace(/\[(\D)]/g, '$1').trim();

  if (item === '') {
    return;
  }

  return item;
}
