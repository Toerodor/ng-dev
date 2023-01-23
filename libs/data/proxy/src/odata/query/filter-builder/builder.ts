import { FilterExpression, isFilterCriteria, FilterCriteria } from '@loriini/data/query';

import { OperatorDictionary } from './operator-dictionary';

export const fromFilterCriteria = (criteria :FilterCriteria) => {
  const formatter = OperatorDictionary[criteria.op]
  if(!formatter) {
    throw new Error()
  }

  return formatter.call(null, criteria);
}

export const fromFilterExpression = (expression: FilterExpression) => {
  return expression.items.reduce<string[]>((arr, value) => ([
    ...arr,
    isFilterCriteria(value) ? fromFilterCriteria(value) : `(${fromFilterExpression(value)})`
  ]), []).join(` ${expression.logic} `);
}

export const toODataString: (expression: FilterExpression) => string = (expression: FilterExpression) => fromFilterExpression(expression);
