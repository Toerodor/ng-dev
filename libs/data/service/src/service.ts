import { Observable } from 'rxjs';

import { isArray, isFunction, mergeObjects } from '@loriini/miscellaneous';

import { InferOperation, Operation, OperationType, Proxy, ProxyConstructor } from '@loriini/data/proxy';
import { FilterCriteria, FilterExpression } from '@loriini/data/query';

type TObject = Record<string | number, unknown>;

export class DataService<
  TProxy extends Proxy,
  TOperation extends Operation = InferOperation<TProxy>
> {

  protected readonly url: string;

  protected readonly proxy: Proxy;

  constructor(url: string, proxy: TProxy | ProxyConstructor<TProxy>) {
    this.url = url;
    this.proxy = isFunction(proxy) ? Reflect.construct(proxy, []) : proxy;
  }

  public create<T>(options: {
    data: TObject | TObject[];
    url?: string
  } & Omit<TOperation, 'payload' | 'type' | 'query'>, rawResult?: boolean): Observable<T>;

  public create<T>(options: {
    key: string | number;
    data: TObject | TObject[];
    url?: string
  } & Omit<TOperation, 'payload' | 'type' | 'query'>, rawResult?: boolean): Observable<T>;

  public create<T>(options: {
    key?: string | number;
    data: TObject | TObject[];
    url?: string
  } & Omit<TOperation, 'payload' | 'type' | 'query'>, rawResult: boolean = false): Observable<T> {
    const { data, key, url, ...extraOptions } = options;

    return this.request<T>(mergeObjects({
      url: url ?? this.url,
      type: OperationType.CREATE,
      payload: data,
      query: {
        key: key
      }
    }, extraOptions) as TOperation, rawResult).pipe();
  }

  public read<T>(options: {
    key: string | number;
    url?: string
    filter?: FilterExpression | (FilterCriteria | FilterExpression)[]
  } & Omit<TOperation, 'payload' | 'type' | 'query'>, rawResult?: boolean): Observable<T>;

  public read<T>(options: {
    url?: string
    skip?: number;
    take?: number;
    count?: number;
    filter?: FilterExpression | (FilterCriteria | FilterExpression)[]
  } & Omit<TOperation, 'payload' | 'type' | 'query'>, rawResult?: boolean): Observable<T>;

  public read<T>(options: {
    url?: string
    key?: string | number;
    skip?: number;
    take?: number;
    count?: number;
    filter?: FilterExpression | (FilterCriteria | FilterExpression)[]
  } & Omit<TOperation, 'payload' | 'type' | 'query'>, rawResult: boolean = false): Observable<T> {
    const {
      url,
      key,
      skip,
      take,
      count,
      filter,
      ...extraOptions
    } = options;

    return this.request<T>(mergeObjects({
      url: url ?? this.url,
      type: OperationType.READ,
      query: {
        key: key,
        skip: skip,
        take: take,
        count: count,
        filter: isArray(filter) ? { logic: 'and', items: filter } : filter
      }
    }, extraOptions) as TOperation, rawResult).pipe();
  }

  public update<T>(options: {
    data: TObject | TObject[];
    url?: string
  } & Omit<TOperation, 'payload' | 'type' | 'query'>, rawResult?: boolean): Observable<T>;

  public update<T>(options: {
    key: string | number;
    data: TObject | TObject[];
    url?: string
  } & Omit<TOperation, 'payload' | 'type' | 'query'>, rawResult?: boolean): Observable<T>;

  public update<T>(options: {
    key?: string | number;
    data: TObject | TObject[];
    url?: string
  } & Omit<TOperation, 'payload' | 'type' | 'query'>, rawResult: boolean = false): Observable<T> {
    const { data, key, url, ...extraOptions } = options;

    return this.request<T>(mergeObjects({
      url: url ?? this.url,
      type: OperationType.UPDATE,
      payload: data,
      query: {
        key: key
      }
    }, extraOptions) as TOperation, rawResult).pipe();
  }

  public delete<T>(options: {
    data: TObject | TObject[];
    url?: string
  } & Omit<TOperation, 'payload' | 'type' | 'query'>, rawResult?: boolean): Observable<T>;

  public delete<T>(options: {
    key: string | number;
    data: TObject | TObject[];
    url?: string
  } & Omit<TOperation, 'payload' | 'type' | 'query'>, rawResult?: boolean): Observable<T>;

  public delete<T>(options: {
    key?: string | number;
    data: TObject | TObject[];
    url?: string
  } & Omit<TOperation, 'payload' | 'type' | 'query'>, rawResult: boolean = false): Observable<T> {
    const { data, key, url, ...extraOptions } = options;

    return this.request<T>(mergeObjects({
      url: url ?? this.url,
      type: OperationType.DELETE,
      payload: data,
      query: {
        key: key
      }
    }, extraOptions) as TOperation, rawResult).pipe();
  }

  public action() {
    // TODO: action
  }

  public function() {
    // TODO: function
  }

  public request<T>(operation: TOperation, rawResult: boolean = false): Observable<T> {
    return this.proxy.execute(operation, rawResult) as Observable<T>;
  }

}
