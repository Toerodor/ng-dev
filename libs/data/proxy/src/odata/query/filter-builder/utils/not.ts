import { FilterCriteria } from '@loriini/data/query';

export const not = (fn:  (criteria: FilterCriteria) => string) => (criteria: FilterCriteria) => `not(${fn.call(criteria)})`;
