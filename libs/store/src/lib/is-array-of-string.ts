import { isArray } from '@loriini/miscellaneous';

export function isArrayOfString(value: unknown): value is Array<string> {
  return isArray(value) && value.every(x => (typeof x === 'string'))
}
