import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassifierListComponent } from './classifier-list.component';


@NgModule({
  imports: [CommonModule],
  declarations: [ClassifierListComponent],
  exports: [ClassifierListComponent]
})
export class ClassifierListModule {
}
