import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { handbookRoutes } from './handbook.routes';
import { HandbookComponent } from './handbook.component';

import { HandbookListModule } from './components/handbook-list';
import { HandbookViewModule } from './components/handbook-view';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(handbookRoutes), HandbookListModule, HandbookViewModule],
  declarations: [HandbookComponent],
  exports: [HandbookComponent]
})
export class HandbookModule {
}
