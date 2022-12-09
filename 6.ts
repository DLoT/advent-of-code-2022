import { read } from './helpers';

// TODO find the first occurrence of unique chars
// https://adventofcode.com/2022/day/6

(async () => {
  const data    = await read(__filename)
  const marker  = 4;
  const message = 14;

  const firstMarker = findUniqueCharPosition(data, marker);
  console.log({ firstMarker });

  const firstMessage = findUniqueCharPosition(data, message);
  console.log({ firstMessage });
})()

function findUniqueCharPosition(data: string, sequenceLength: number) {
  for (let i = 0, len = data.length; i < len; i++) {
    const part = data.slice(i, i + sequenceLength);
    if (hasOnlyUniqueChars(part)) {
      console.log({ i: i + sequenceLength, part });

      return i + sequenceLength;
    }
  }
}

function hasOnlyUniqueChars(part: string): boolean {
  return new Set(part.split('')).size === part.length;
}
