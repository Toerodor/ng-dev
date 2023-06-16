import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule, InlineInputModule, PanelModule, PropertyListModule } from '@dev/ui';

import { HandbookViewComponent } from './handbook-view.component';
import { ClassifierListModule } from '../classifier-list';

@NgModule({
  imports: [CommonModule, ButtonModule, PanelModule, InlineInputModule, PropertyListModule, ClassifierListModule],
  declarations: [HandbookViewComponent],
  exports: [HandbookViewComponent]
})
export class HandbookViewModule {
}
