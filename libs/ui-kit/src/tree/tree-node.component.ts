import { ChangeDetectionStrategy, Component, HostBinding, inject, Input, ViewEncapsulation } from '@angular/core';

import { TreeComponent } from './tree.component';
import { NodeType } from './types';


@Component({
  selector: 'x-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TreeNodeComponent<T> {

  @Input({ required: true }) node!: NodeType<T>;

  @HostBinding('class.x-tree-node') hostClass = true;

  tree: TreeComponent<T> = inject(TreeComponent);

  get indent() {
    return Array(this.node.level)
  }

}
