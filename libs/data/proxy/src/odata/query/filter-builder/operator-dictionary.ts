import { FilterCriteria } from '@loriini/data/query';

import { binary, string, not, equalNull, notEqualNull } from './utils';

const eq = binary('eq');
const ne = binary('ne');
const lt = binary('lt');
const lte = binary('lte');
const gt = binary('gt');
const gte = binary('gte');

const isnull = equalNull();
const isnotnull = notEqualNull();

const startswith = string('startswith');
const endswith = string('endswith');
const contains = string('contains');
const doesnotcontain = not(string('doesnotcontain'));

export const OperatorDictionary: Record<string, (criteria: FilterCriteria) => string> = {

  /** |EQUALS| */
  '=': eq,
  'eq': eq,

  /** |NOT EQUALS| */
  '!=': ne,
  '<>': ne,
  'neq': ne,
  'ne': ne,

  /** |LESS THAN| */
  'lt': lt,
  '<': lt,

  /** |LESS THAN OR EQUAL TO| */
  'lte': lte,
  '<=': lte,

  /** |GREATER THAN| */
  'gt': gt,
  '>': gt,

  /** |GREATER THAN OR EQUAL TO| */
  'gte': gte,
  '>=': gte,

  /** |IS NULL| */
  'isnull': isnull,

  /** |IS NOT NULL| */
  'isnotnull': isnotnull,

  /** |STARTSWITH| */
  'startswith': startswith,

  /** |ENDSWITH| */
  'endswith': endswith,

  /** |CONTAINS| */
  'contains': contains,

  /** |DOESNOTCONTAIN| */
  'doesnotcontain': doesnotcontain,

} as const;
