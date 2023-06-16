import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { handbookRoutes } from './handbook.routes';
import { HandbookComponent } from './handbook.component';

import { HandbookListModule } from './components/handbook-list';
import { HandbookViewModule } from './components/handbook-view';

import { TreeModule } from '@info-support/ui-kit';

import { TableModule } from '@dev/ui';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(handbookRoutes), HandbookListModule, HandbookViewModule, TableModule, TreeModule],
  declarations: [HandbookComponent],
  exports: [HandbookComponent]
})
export class HandbookModule {
}
