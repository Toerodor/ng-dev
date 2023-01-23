import { FilterCriteria } from '@loriini/data/query';

import { OperatorDictionary } from './operator-dictionary';

export function registerFilterOperators(operators: Record<string, (criteria: FilterCriteria) => string>)  {
  Object.keys(operators).forEach(key => registerFilterOperator(key, operators[key]));
}


export function registerFilterOperator(operator: string, fn: (criteria: FilterCriteria) => string)  {
  if(OperatorDictionary[operator]) {
    console.warn(`OData Proxy: ${operator} override.`);
  }

  OperatorDictionary[operator] = fn;
}
