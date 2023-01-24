import { FilterExpression } from '@loriini/data/query';

import { HttpMethod, ServerOperation, ServerProxy } from '../server';
import { OperationType } from '../operation';


export class RestProxy extends ServerProxy {

  protected override get defaultHeaders(): { [key: string]: string | string[]; } {
    return {};
  }

  protected override get defaultsMethods(): Record<OperationType, HttpMethod> {
    return {
      [OperationType.CREATE]: 'POST',
      [OperationType.READ]: 'GET',
      [OperationType.UPDATE]: 'PUT',
      [OperationType.DELETE]: 'DELETE',
      [OperationType.ACTION]: 'GET',
      [OperationType.FUNCTION]: 'POST'
    };
  }

  protected override get defaultFilterCompilerDictionary(): Record<string, (obj: unknown) => string> {
    return super.defaultFilterCompilerDictionary;
  }

  protected override makeQueryParams(operation: Required<ServerOperation>): { [p: string]: string | number | boolean | ReadonlyArray<string | number | boolean> } {
    const { take, skip, filter } = operation.query;
    const query: Record<string, string | boolean | number> = {};

    if (skip !== undefined) {
      query['offset'] = skip;
    }

    if (take !== undefined) {
      query['limit'] = take;
    }

    if (filter !== undefined) {
      query['filter'] = this.makeFilter(filter);
    }

    return query;
  }

  protected makeFilter(expression: FilterExpression): string {
    return '';
  }

}
