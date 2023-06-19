import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassifierListComponent } from './classifier-list.component';
import { TreeModule } from '@info-support/ui-kit';


@NgModule({
  imports: [CommonModule, TreeModule],
  declarations: [ClassifierListComponent],
  exports: [ClassifierListComponent]
})
export class ClassifierListModule {
}
