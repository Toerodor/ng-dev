
export type NodeType<T> = {
  internalId: string | number;
  level: number;
  label: string;
  leaf: boolean;
  checked: boolean;
  expanded: boolean;
  children: NodeType<T>[];
} & T;
