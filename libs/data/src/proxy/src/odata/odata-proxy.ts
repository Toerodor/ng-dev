import { HttpResponse } from '@angular/common/http';

import { normalizeArray } from '@loriini/miscellaneous';

import { HttpMethod, ServerOperation, ServerProxy } from '../server';
import { OperationType } from '../operation';
import { ResultSet } from '../result-set';

import { isODataCollection } from './odata-collection';
import { isODataEntity } from './odata-entity';
import { filterBuilder } from './query-builder/filter';


export class ODataProxy extends ServerProxy {

  protected override get defaultHeaders(): { [key: string]: string | string[]; } {
    return {
      "OData-Version": "4.0"
    }
  }

  protected override get defaultsMethods(): Record<OperationType, HttpMethod> {
    return {
      [OperationType.CREATE]: "POST",
      [OperationType.READ]: "GET",
      [OperationType.UPDATE]: "PATCH",
      [OperationType.DELETE]: "DELETE",
      [OperationType.ACTION]: "GET",
      [OperationType.FUNCTION]: "POST"
    };
  }

  protected override makeQueryParams(operation: Required<ServerOperation>): { [p: string]: string | number | boolean | ReadonlyArray<string | number | boolean> } {
    const { count, take, skip, filter } = operation.query;
    const query: Record<string, string | boolean | number> = {};

    if(skip !== undefined) {
      query["$skip"] = skip;
    }

    if(take !== undefined) {
      query["$top"] = take;
    }

    if(count !== undefined) {
      query["$count"] = count;
    }

    if(filter !== undefined) {
      query["$filter"] = filterBuilder(filter);
    }

    return query;
  }

  protected override processResponse<T>(response: HttpResponse<unknown>): ResultSet<T> {
    const body = response.body;

    let data: T[] = [];
    let count: number | undefined = undefined;

    if(isODataCollection(body)) {
      data = body["value"] as T[];
      count = body["@odata.count"];
    } else if(isODataEntity(body)) {
      data = normalizeArray(body) as T[];
      count = 1;
    }

    return new ResultSet<T>({ data, count });
  }

}
