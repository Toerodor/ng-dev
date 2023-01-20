import { InferOperation, Operation, Proxy, ProxyConstructor } from '../../proxy';
import { DataService } from './service';

export function createService<
  TProxy extends Proxy,
  TOperation extends Operation = InferOperation<TProxy>
>(url: string, proxy: TProxy | ProxyConstructor<TProxy>): DataService<TProxy, TOperation> {
  return new DataService(url, proxy);
}
