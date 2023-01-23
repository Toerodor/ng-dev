import { FilterCriteria } from '@loriini/data/query';
import { normalize } from './normalize';

export const string = (operator: string) => normalize(({ field, value }: FilterCriteria) => `${operator}(${field}, ${value})`);

