import { FilterCriteria } from '@loriini/data/query';

import { normalize } from './normalize';

export const binary = (operator: string) => normalize(({ field, value }: FilterCriteria) => `${field} ${operator} ${value}`);
