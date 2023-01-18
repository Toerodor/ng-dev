import { isArray } from './is-array';

export function normalizeArray<T>(value: T | T[], allowNull = false): T[] {
  return isArray(value)
    ? value
    : (allowNull ? false : value === null) || value === undefined
      ? []
      : [value];
}
