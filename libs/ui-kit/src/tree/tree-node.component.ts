import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'x-tree-node',
  templateUrl: './tree-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TreeNodeComponent {

}
