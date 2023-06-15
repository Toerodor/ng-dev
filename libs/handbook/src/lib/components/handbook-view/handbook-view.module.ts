import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule, InlineInputModule, PanelModule, PropertyListModule } from '@dev/ui';

import { HandbookViewComponent } from './handbook-view.component';

@NgModule({
  imports: [CommonModule, ButtonModule, PanelModule, InlineInputModule, PropertyListModule],
  declarations: [HandbookViewComponent],
  exports: [HandbookViewComponent]
})
export class HandbookViewModule {
}
