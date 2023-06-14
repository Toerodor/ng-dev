import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HandbookViewComponent } from './handbook-view.component';
import { PanelModule } from '@dev/ui';

@NgModule({
  imports: [CommonModule, PanelModule],
  declarations: [HandbookViewComponent],
  exports: [HandbookViewComponent]
})
export class HandbookViewModule {
}
