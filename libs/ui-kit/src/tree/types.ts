
export type NodeType<T> = {
  internalId: string | number;
  level: number;
  leaf: boolean;
  checked: boolean;
  expanded: boolean;
  children: NodeType<T>[];
} & T;
