import { catchError, map, Observable, throwError } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';

import { normalizeArray } from '@loriini/miscellaneous';

import { Proxy } from '../proxy';
import { ResultSet } from '../result-set';
import { OperationType } from '../operation';

import { normalizeServerOperation, ServerOperation } from './server-operation';
import { HttpMethod } from './http-method';


export class ServerProxy extends Proxy {

  protected get withCredentials(): boolean {
    return true;
  }

  protected get responseType(): 'arraybuffer' | 'blob' | 'json' | 'text' {
    return 'json';
  }

  protected get defaultHeaders(): { [key: string]: string | string[]; } {
    return {};
  }

  protected get defaultParams(): { [key: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; } {
    return {};
  }

  protected get defaultsMethods(): Record<OperationType, HttpMethod> {
    return {
      [OperationType.CREATE]: 'POST',
      [OperationType.READ]: 'GET',
      [OperationType.UPDATE]: 'POST',
      [OperationType.DELETE]: 'POST',
      [OperationType.ACTION]: 'POST',
      [OperationType.FUNCTION]: 'POST'
    };
  }

  protected get defaultFilterCompilerDictionary(): Record<string, (obj: unknown) => string> {
    return {}
  }

  protected readonly http: HttpClient = inject(HttpClient);

  public execute<T>(operation: ServerOperation, rawResult: boolean = false): Observable<ResultSet<T> | T> {
    const normalizedOperation = normalizeServerOperation(operation);

    const url = this.makeUrl(normalizedOperation);
    const method = this.makeHttpMethod(normalizedOperation);
    const params = this.makeHttpParams(normalizedOperation);
    const headers = this.makeHttpHeaders(normalizedOperation);
    const queryParams = this.makeQueryParams(normalizedOperation);

    return this.http.request(method, url, {
      observe: 'response',
      headers: headers,
      params: { ...params, ...queryParams },
      withCredentials: this.withCredentials,
      responseType: this.responseType,
      reportProgress: false
    }).pipe(
      map((response) => rawResult ? (response.body ?? {}) : this.processResponse(response)),
      catchError((error) => throwError(() => {
        console.log(error);
        return null;
      }))
    );
  }

  protected makeUrl(operation: Required<ServerOperation>): string {
    const { key } = operation.query;

    let url = operation.url;

    if (key) {
      if (!url.match(/\/$/)) {
        url += '/';
      }

      url += encodeURIComponent(key);
    }

    return url;
  }

  protected makeHttpMethod(operation: Required<ServerOperation>): HttpMethod {
    return this.defaultsMethods[operation.type];
  }

  protected makeHttpParams(operation: Required<ServerOperation>): {
    [key: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  } {
    return { ...this.defaultParams, ...operation.extraParams };
  }

  protected makeHttpHeaders(operation: Required<ServerOperation>): {
    [key: string]: string | string[];
  } {
    return { ...this.defaultHeaders, ...operation.extraHeaders };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected makeQueryParams(_operation: Required<ServerOperation>): { [key: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; } {
    return {};
  }

  protected processResponse<T>(response: HttpResponse<unknown>): ResultSet<T> {
    const data = normalizeArray(response.body) as T[];
    const count = data.length;

    return new ResultSet<T>({
      data,
      count
    });
  }

}

