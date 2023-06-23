import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TreeComponent } from './tree.component';
import { TreeNodeComponent } from './tree-node.component';
import { TreeDragAndDropDirective } from './tree-drag-and-drop.directive';

@NgModule({
  declarations: [
    TreeComponent,
    TreeNodeComponent,
    TreeDragAndDropDirective
  ],
  exports: [
    TreeComponent,
    TreeDragAndDropDirective
  ],
  imports: [
    CommonModule,
  ]
})
export class TreeModule {
}
