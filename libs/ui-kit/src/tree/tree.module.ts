import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeComponent } from './tree.component';
import { TreeNodeComponent } from './tree-node.component';

@NgModule({
  declarations: [TreeComponent, TreeNodeComponent],
  exports: [TreeComponent],
  imports: [
    CommonModule,
  ]
})
export class TreeModule {
}
