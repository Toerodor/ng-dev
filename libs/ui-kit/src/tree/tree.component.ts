import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  NgZone,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { NodeType } from './types';
import { TreeNodeComponent } from './tree-node.component';


@Component({
  selector: 'x-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TreeComponent<T> implements OnChanges {

  @Input() data: T[] = [];

  @Output() nodeClick = new EventEmitter<MouseEvent>();

  @HostBinding('class.x-tree') hostClass = true;

  nodes: NodeType<T>[] = [];
  ngZone: NgZone = inject(NgZone);
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  draggedNode: TreeNodeComponent<T> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;

    data && this.processData();
  }

  processData() {
    const process = (data: T[], level = 0, parentNode: NodeType<T> | null = null): NodeType<T>[] => {
      const nodes: NodeType<T>[] = [];

      for (let i = 0; i < data.length; i++) {
        const item = data[i] as T & { children?: T[] };

        const node: NodeType<T> = {
          expanded: false,
          checked: false,
          children: [],
          label: '',
          leaf: !item.children,
          ...item,
          internalId: parentNode ? `${parentNode.internalId}-${i}` : i,
          level: level
        };

        if (!node.leaf) {
          node.children = process(node.children, level + 1, node);
        }

        nodes.push(node);
      }

      return nodes;
    };

    const nodes = process(this.data);

    for (const node of nodes) {
      if (node.expanded && !node.leaf) {
        const index = nodes.indexOf(node);
        nodes.splice(index + 1, 0, ...node.children);
      }
    }

    this.nodes = nodes;

    this.changeDetectorRef.detectChanges();
  }

  handleToggle(event: MouseEvent | TouchEvent, node: NodeType<T>) {
    this.ngZone.run(() => {
      node.expanded = !node.expanded;

      const nodes = [...this.nodes];
      const index = nodes.indexOf(node);

      if (node.expanded) {
        const nds: NodeType<T>[] = [];

        const append = (node: NodeType<T>) => {
          for (const child of node.children) {
            nds.push(child);
            child.expanded && append(child);
          }
        };

        append(node);
        nodes.splice(index + 1, 0, ...nds);
      } else {
        let count = 0;

        const remove = (node: NodeType<T>) => {
          count += node.children.length;

          for (const child of node.children) {
            child.expanded && remove(child);
          }
        };

        remove(node);
        nodes.splice(index + 1, count);
      }

      event?.preventDefault();
      event?.stopPropagation();

      this.nodes = nodes;
    });
  }

  trackByItem(_: number, item: NodeType<T>) {
    return item.internalId;
  }

}

