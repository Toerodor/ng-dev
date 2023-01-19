import { InferOperation, Operation, Proxy, ProxyConstructor } from '@loriini/data/proxy';
import { DataService } from './service';

export function createService<
  TProxy extends Proxy,
  TOperation extends Operation = InferOperation<TProxy>
>(proxy: TProxy | ProxyConstructor<TProxy>): DataService<TProxy, TOperation> {
  return new DataService(proxy);
}
