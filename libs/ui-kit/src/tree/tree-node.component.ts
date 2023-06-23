import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, inject, Input } from '@angular/core';

import { Node } from './types';
import { TreeComponent } from './tree.component';

@Component({
  selector: 'x-tree-node',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <ng-container [ngSwitch]='true'>
      <ng-container *ngSwitchCase='node.leaf'>
        <span class='x-tree-node-toggle x-tree-node-toggle-noop' style='cursor: default'>
          <span class='x-tree-node-toggle-leaf'></span>
        </span>
      </ng-container>
      <ng-container *ngSwitchCase='!node.leaf'>
        <span class='x-tree-node-toggle' (click)='treeComponent.handleNodeToggle($event, node)'>
          <span>
            <svg width='1em' height='1em' viewBox='0 0 16 16' role='img'>
              <path
                d='M10.71 7.29l-4-4a1.003 1.003 0 00-1.42 1.42L8.59 8 5.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l4-4c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z'
              ></path>
            </svg>
          </span>
        </span>
      </ng-container>
    </ng-container>
    <span class='x-tree-node-content'>
      {{node.label}}
    </span>
  `
})
export class TreeNodeComponent<T> {
  public elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  public treeComponent: TreeComponent<T> = inject(TreeComponent);

  /** @hidden */
  @HostBinding('class.x-tree-node')
  public get className(): boolean {
    return true;
  }

  /** @hidden */
  @HostBinding('style.padding-left.rem')
  public get paddingLeft(): number {
    return this.node.level;
  }

  /**
   * @en_US Label
   */
  @Input() public node!: Node<T>;


}
