import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  inject,
  Input,
  NgZone,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { NodeType } from './types';


@Component({
  selector: 'x-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TreeComponent<T> implements OnChanges {

  @Input() data: T[] = [];

  @HostBinding('class.x-tree') hostClass = true;

  nodes: NodeType<T>[] = [];
  ngZone = inject(NgZone);
  changeDetectorRef = inject(ChangeDetectorRef);

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
          leaf: !item.children,
          ...item,
          internalId: parentNode ? `${parentNode.internalId}-${i}` : i,
          level: level,
        };

        if(!node.leaf) {
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

  handleToggle(event: MouseEvent, node: NodeType<T>) {

    this.ngZone.run(() => {
      node.expanded = !node.expanded;

      const nodes = [...this.nodes];
      const index = nodes.indexOf(node);

      console.log([...nodes]);

      if(node.expanded) {

      } else {
        let deleteCount = 0;
        const count = (node: NodeType<T>) => {
          deleteCount += node.children.length;

          for (const child of node.children) {
            child.expanded && count(child);
          }
        }

        count(node);

        nodes.splice(index + 1, deleteCount);
      }

      event?.preventDefault();
      event?.stopPropagation();

      this.nodes = nodes;
    });
  }
}

