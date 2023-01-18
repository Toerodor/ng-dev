import { catchError, map, Observable, throwError } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';

import { normalizeArray } from '@loriini/miscellaneous';

import { Proxy } from '../proxy';
import { ResultSet } from '../result-set';
import { OperationType } from '../operation';

import { ServerOperation } from './server-operation';
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
      [OperationType.CREATE]: "POST",
      [OperationType.READ]: "GET",
      [OperationType.UPDATE]: "POST",
      [OperationType.DELETE]: "POST",
      [OperationType.ACTION]: "POST",
      [OperationType.FUNCTION]: "POST"
    };
  }

  protected readonly http: HttpClient = inject(HttpClient);

  public execute<T>(operation: ServerOperation): Observable<ResultSet<T>> {
    const url = this.makeUrl(operation);
    const method = this.makeHttpMethod(operation);
    const params = this.makeHttpParams(operation);
    const headers = this.makeHttpHeaders(operation);
    const queryParams = this.makeQueryParams(operation);

    return this.http.request(method, url, {
      observe: "response",
      headers: headers,
      params: { ...params, ...queryParams },
      withCredentials: this.withCredentials,
      responseType: this.responseType,
      reportProgress: false
    }).pipe(
      map((response) => this.processResponse(response) as ResultSet<T>),
      catchError((error) => throwError(() => {
        console.log(error);
        return null;
      }))
    );
  }

  protected makeUrl(operation: ServerOperation): string {
    let url = operation.url;

    if (operation.query?.key) {
      const key = operation.query?.key;

      if (!url.match(/\/$/)) {
        url += "/";
      }

      url += encodeURIComponent(key);
    }

    return url;
  }

  protected makeHttpMethod(operation: ServerOperation): HttpMethod {
    return this.defaultsMethods[operation.type];
  }

  protected makeHttpParams(operation: ServerOperation): {
    [key: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  } {
    return { ...this.defaultParams, ...operation.extraParams };
  }

  protected makeHttpHeaders(operation: ServerOperation): {
    [key: string]: string | string[];
  } {
    return { ...this.defaultHeaders, ...operation.extraHeaders };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected makeQueryParams(_operation: ServerOperation): { [key: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; } {
    return {};
  }

  protected processResponse<TIn, TOut>(response: HttpResponse<TIn>): ResultSet<TOut> {
    const data = normalizeArray(response.body) as unknown as TOut[];
    const count = data.length;

    return new ResultSet<TOut>({
      data,
      count,
    });
  }

}
