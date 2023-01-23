import { isString } from '@loriini/miscellaneous';

import { FilterCriteria } from '@loriini/data/query';

function _normalize(criteria: FilterCriteria): FilterCriteria {
  let value = isString(criteria.value)
    ? `'${criteria.value}'`
    : `${criteria.value}`;

  let field = isString(criteria.field)
    ? `${criteria.field}`.replace(/\./g, "/")
    : `${criteria.field}`;

  if(criteria.caseSensitive) {
    field = `tolower(${field})`;
    value = value.toLowerCase();
  }

  return { ...criteria, field, value };
}

export const normalize = (fn:  (criteria: FilterCriteria) => string) => (criteria: FilterCriteria) => fn.call(_normalize(criteria));
