import { FilterCriteria } from '@loriini/data/query';

export const filterOperatorFactory
  = (fn: (criteria: FilterCriteria) => string) => (criteria: FilterCriteria) => fn.call(criteria);

export const filterOperatorWrapper
  = (
    operator: (criteria: FilterCriteria) => string,
    fn: (str: string) => string
) => (criteria: FilterCriteria) => fn.call(null, operator.call(null, criteria))

