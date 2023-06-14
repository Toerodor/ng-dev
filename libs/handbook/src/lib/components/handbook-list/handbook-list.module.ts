import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HandbookListComponent } from './handbook-list.component';
import { ButtonModule } from '@dev/ui';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [HandbookListComponent],
  exports: [HandbookListComponent]
})
export class HandbookListModule {
}
