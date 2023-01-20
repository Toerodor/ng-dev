import { isObject } from '@loriini/miscellaneous';

export type FilterCriteria<T = unknown> = {
  field: string | FilterCriteria;
  op: string;
  value?: T;
  caseSensitive?: boolean;
}

export function isFilterCriteria<T = unknown>(value: unknown): value is FilterCriteria<T> {
  return isObject(value) && ('field' in value && 'op' in value);
}
