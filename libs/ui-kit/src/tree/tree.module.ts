import { NgModule } from '@angular/core';
import { TreeComponent } from './tree.component';
import { TreeNodeComponent } from './tree-node.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TreeComponent, TreeNodeComponent],
  exports: [TreeComponent],
  imports: [
    CommonModule
  ]
})
export class TreeModule {
}
