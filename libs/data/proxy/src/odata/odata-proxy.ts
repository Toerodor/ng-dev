import { HttpResponse } from '@angular/common/http';

import { normalizeArray } from '@loriini/miscellaneous';
import { FilterExpression, isFilterCriteria, isFilterExpression } from '@loriini/data/query';

import { RestProxy } from '../rest';
import { HttpMethod, ServerOperation } from '../server';
import { OperationType } from '../operation';
import { ResultSet } from '../result-set';

import { isODataCollection } from './odata-collection';
import { isODataEntity } from './odata-entity';

import {
  eq,
  ne,
  lt,
  lte,
  gt,
  gte,
  eqEmpty,
  neEmpty,
  eqNull,
  neNull,
  contains,
  endswith,
  startswith,
  doesnotcontain,
  oDataJoinFilterOperator
} from './query/filter';


export class ODataProxy extends RestProxy {

  protected override get defaultHeaders(): { [key: string]: string | string[]; } {
    return {
      'OData-Version': '4.0',
      'Prefer': 'return=representation'
    };
  }

  protected override get defaultsMethods(): Record<OperationType, HttpMethod> {
    return {
      [OperationType.CREATE]: 'POST',
      [OperationType.READ]: 'GET',
      [OperationType.UPDATE]: 'PATCH',
      [OperationType.DELETE]: 'DELETE',
      [OperationType.ACTION]: 'GET',
      [OperationType.FUNCTION]: 'POST'
    };
  }

  protected override get defaultFilterCompilerDictionary(): Record<string, (obj: unknown) => string> {
    return {
      /** |EQUALS| */
      '=': eq,
      'eq': eq,
      'equals': eq,

      /** |NOT EQUALS| */
      '!=': ne,
      '<>': ne,
      'neq': ne,
      'ne': ne,
      'notequal': ne,

      /** |LESS THAN| */
      'lt': lt,
      '<': lt,

      /** |LESS THAN OR EQUAL TO| */
      'lte': lte,
      '<=': lte,

      /** |GREATER THAN| */
      'gt': gt,
      '>': gt,

      /** |GREATER THAN OR EQUAL TO| */
      'gte': gte,
      '>=': gte,

      /** |IS NULL| */
      'isnull': eqNull,

      /** |IS NOT NULL| */
      'isnotnull': neNull,

      /** |IS EMPTY| */
      'isempty': eqEmpty,

      /** |IS NOT EMPTY| */
      'isnotempty': neEmpty,

      /** |STARTSWITH| */
      'startswith': startswith,

      /** |ENDSWITH| */
      'endswith': endswith,

      /** |CONTAINS| */
      'contains': contains,

      /** |DOESNOTCONTAIN| */
      'doesnotcontain': doesnotcontain,
    };
  }


  protected override makeQueryParams(operation: Required<ServerOperation>): { [p: string]: string | number | boolean | ReadonlyArray<string | number | boolean> } {
    const { count, take, skip, filter } = operation.query;
    const query: Record<string, string | boolean | number> = {};

    if (skip !== undefined) {
      query['$skip'] = skip;
    }

    if (take !== undefined) {
      query['$top'] = take;
    }

    if (count !== undefined) {
      query['$count'] = count;
    }

    if (filter !== undefined) {
      query['$filter'] = this.makeFilter(filter);
    }

    return query;
  }

  protected override processResponse<T>(response: HttpResponse<unknown>): ResultSet<T> {
    const body = response.body;

    let data: T[] = [];
    let count: number | undefined = undefined;

    if (isODataCollection(body)) {
      data = body['value'] as T[];
      count = body['@odata.count'];
    } else if (isODataEntity(body)) {
      data = normalizeArray(body) as T[];
      count = 1;
    }

    return new ResultSet<T>({ data, count });
  }

  protected override makeFilter(expression: FilterExpression): string {
    return expression.items.reduce<string[]>((acc, item) => {
      if(isFilterCriteria(item)) {
        acc.push(this.defaultFilterCompilerDictionary[item.op].call(null, item));
      } else if(isFilterExpression(item)) {
        acc.push(`(${this.makeFilter(item)})`);
      }
      return acc;
    }, []).join(oDataJoinFilterOperator(expression.logic))
  }

}
