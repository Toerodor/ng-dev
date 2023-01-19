import { Observable } from 'rxjs';

import { isArray, isFunction, isNumber, isObject, isString } from '@loriini/miscellaneous';

import { InferOperation, Operation, OperationType, Proxy, ProxyConstructor } from '../../proxy';

type PayloadData =  Record<string | number, unknown>;

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

  // public create(data: PayloadData): Observable<any>;
  // public create(data: PayloadData[]): Observable<any>;
  // public create(key: string | number, data: PayloadData): Observable<any>;
  // public create(keyOrData: string | number | PayloadData | PayloadData[], dataOrNull?: PayloadData | PayloadData[]): Observable<any> {
  //
  //   let key = undefined;
  //   let payload = undefined;
  //   if((isString(keyOrData) || isNumber(keyOrData)) && isObject(dataOrNull)) {
  //     key = keyOrData;
  //     payload = dataOrNull;
  //   } else if(isObject(keyOrData) || isArray(keyOrData)) {
  //     payload = keyOrData;
  //   } else {
  //     throw new Error("");
  //   }
  //
  //   return this.request({
  //     url: this.url,
  //     type: OperationType.CREATE,
  //     payload: payload,
  //     query: {
  //       key: key
  //     }
  //   } as TOperation)
  // }

  public read() {
  }

  public update() {
  }

  public delete() {
  }

  public action() {
  }

  public function() {
  }

  public request(operation: TOperation): Observable<any> {
    return undefined
  }

}
