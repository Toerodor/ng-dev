export { isODataCollection, ODataCollection } from './odata-collection';
export { isODataEntity, ODataEntity } from './odata-entity';
export { ODataProxy } from './odata-proxy';

import {
  string,
  not,
  binary,
  notEqualNull,
  equalNull,
  normalize,
  fromFilterCriteria,
  fromFilterExpression,
  toODataStringFilter,
  registerFilterOperator,
  registerFilterOperators
} from "./query"

export const ODataQueryBuilder = {
  filter: {
    string,
    not,
    binary,
    notEqualNull,
    equalNull,
    normalize,
    fromFilterCriteria,
    fromFilterExpression,
    toODataStringFilter,
    registerFilterOperator,
    registerFilterOperators
  }
}
