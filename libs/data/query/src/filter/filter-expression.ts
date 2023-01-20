import { isObject } from '@loriini/miscellaneous';

import { FilterCriteria } from './filter-criteria';

export type FilterExpression = {
  logic: 'and' | 'or';
  items: (FilterCriteria | FilterExpression)[]
}

export function isFilterExpression(value: unknown): value is FilterExpression {
  return isObject(value) && ('logic' in value && 'items' in value);
}
