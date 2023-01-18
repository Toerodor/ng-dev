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
  query?: {
    key?: string | number
  }
}
