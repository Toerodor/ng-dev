import { normalizeOperation, Operation } from '../operation';

export interface ServerOperation extends Operation {
  extraParams?: { [key: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
  extraHeaders?: { [key: string]: string | string[]; };
}

export function normalizeServerOperation(operation: ServerOperation): Required<ServerOperation> {
  operation = normalizeOperation(operation);

  operation.extraParams ??= {};
  operation.extraHeaders ??= {};

  return operation as Required<ServerOperation>;
}
