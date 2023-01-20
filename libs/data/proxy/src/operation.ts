import { Query } from '@loriini/data/query';

export enum OperationType {
  CREATE,
  READ,
  UPDATE,
  DELETE,
  ACTION,
  FUNCTION
}

export type Operation = {
  url: string;
  type: OperationType;
  payload?: unknown | null;
  query?: Query
}

export function normalizeOperation(operation: Operation): Required<Operation> {
  operation.query ??= {};
  operation.payload ??= null;

  return operation as Required<Operation>;
}


