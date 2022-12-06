import { readFile } from 'fs/promises'
import { basename, join } from 'path'

export async function read(task: string): Promise<string> {
  return await readFile(join('input', basename(task).replace('ts', 'txt')), 'utf-8');
}
