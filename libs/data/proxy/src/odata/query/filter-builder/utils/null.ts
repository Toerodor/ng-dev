import { FilterCriteria } from '@loriini/data/query';

export const equalNull = () => ({ field }: FilterCriteria) => `${field} eq null`;

export const notEqualNull = () => ({ field }: FilterCriteria) => `${field} ne null`;
