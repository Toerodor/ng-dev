import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@dev/ui';

import { HandbookListComponent } from './handbook-list.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [HandbookListComponent],
  exports: [HandbookListComponent]
})
export class HandbookListModule {
}
