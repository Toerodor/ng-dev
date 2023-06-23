
export type NodeOption<T> = {
  key?: string;
  label?: string;
  leaf?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  children?: NodeOption<T>[]
} & T;

export type Node<T> = {
  key: string;
  label: string;
  leaf: boolean;
  level: number;
  expanded: boolean;
  disabled: boolean;
  children: Node<T>[]
} & T;
