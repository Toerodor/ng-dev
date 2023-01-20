import { Observable } from 'rxjs';

import { Operation } from './operation';
import { ResultSet } from './result-set';

export interface ProxyConstructor<TProxy extends Proxy> {
  new(): TProxy;
}

export type InferOperation<TProxy extends Proxy> = TProxy['execute'] extends (operation: infer InferOperation) => Observable<ResultSet<unknown>>
  ? InferOperation extends Operation
    ? InferOperation
    : never
  : never

export abstract class Proxy {

  public abstract execute<T>(operation: Operation, rawResult: boolean): Observable<T>;

  public abstract execute<T>(operation: Operation): Observable<ResultSet<T>>;

}
