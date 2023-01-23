import { FilterExpression } from './filter';

export type Query = {
  key?: number | string;
  skip?: number;
  take?: number;
  count?: number;
  filter?: FilterExpression;
}
