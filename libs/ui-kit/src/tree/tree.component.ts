import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  inject,
  Input, NgZone,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';

import { TreeNodeComponent } from './tree-node.component';
import { NodeOption, Node } from './types';

@Component({
  selector: 'x-tree',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <x-tree-node
      *ngFor='let node of nodes'
      [node]='node'
    ></x-tree-node>
  `
})
export class TreeComponent<T> implements OnChanges {
  public zone: NgZone = inject(NgZone);
  public cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  /** @hidden */
  @HostBinding('class.x-tree')
  public get className(): boolean {
    return true;
  }

  /** @hidden */
  @ViewChildren(TreeNodeComponent)
  public nodesQueryList!: QueryList<TreeNodeComponent<T>>;

  /**
   * @en_US Data
   */
  @Input() public data: NodeOption<T>[] = [];

  /** @hidden */
  public nodes: Node<T>[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;

    data && this.handleDataChanges();
  }

  /** @hidden */
  public handleNodeToggle(event: UIEvent, node: Node<T>) {
    event.preventDefault();
    event.stopPropagation();

    const index = this.nodes.indexOf(node);

    this.zone.run(() => {
      node.expanded = !node.expanded;

      if (node.expanded) {
        const nds: Node<T>[] = [];

        const fn = (node: Node<T>) => {
          for (const child of node.children) {
            nds.push(child);
            child.expanded && fn(child);
          }
        };

        fn(node);

        this.nodes.splice(index + 1, 0, ...nds);
      } else {
        let count = 0;
        const fn = (node: Node<T>) => {
          count += node.children.length;

          for (const child of node.children) {
            child.expanded && fn(child);
          }
        };

        fn(node);
        this.nodes.splice(index + 1, count);
      }

      this.nodes = [...this.nodes];
      this.cdr.markForCheck();
    });
  }

  private handleDataChanges() {
    const nodes = toNodes(this.data);

    for (const node of nodes) {
      if (node.expanded && !node.leaf) {
        const index = nodes.indexOf(node);
        nodes.splice(index + 1, 0, ...node.children);
      }
    }

    this.nodes = nodes;
    this.cdr.detectChanges();
  }

}

function toNodes<T>(data: T[], level: number = 0, parentNode: Node<T> | null = null): Node<T>[] {
  return data.map((_item, index) => {
    const item = _item as T & NonNullable<unknown> & Record<string, unknown>;
    const key = parentNode ? `${parentNode.key}-${index}` : `${index}`;

    const node: Node<T> = {
      leaf: !item['children'], level: level, expanded: false, disabled: false, label: '', children: [], ...item, key
    };

    if (!Array.isArray(node.children)) {
      node.children = [node.children];
    }

    if (!node.leaf && node.children) {
      node.children = toNodes(node.children, level + 1, node);
    }

    return node;
  });
}
