import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NodeType } from './types';


@Component({
  selector: 'x-tree',
  templateUrl: './tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TreeComponent<T> implements OnChanges {

  @Input() data: T[] = [];

  nodes: NodeType<T>[] = [];
  keyFieldName = 'key';
  childrenFieldName = 'children';

  changeDetectorRef = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;

    data && this.processData();
  }

  processData() {
    const process = (data: T[], level = 0): NodeType<T>[] => {
      const nodes: NodeType<T>[] = [];

      for (let i = 0; i < data.length; i++) {
        const item = data[i] as T & { children?: T[] };

        const node: NodeType<T> = {
          id: `${level}-${i}`,
          level: level,
          leaf: item.children?.length === 0
        };


        nodes.push(node);
      }
      console.log(nodes);
      return nodes;
    };

    this.nodes = process(this.data);

    this.changeDetectorRef.detectChanges();
  }

}

