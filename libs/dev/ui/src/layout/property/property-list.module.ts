import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyComponent } from './property.component';

import { PropertyListComponent } from './property-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PropertyListComponent, PropertyComponent],
  exports: [PropertyListComponent, PropertyComponent]
})
export class PropertyListModule {}
