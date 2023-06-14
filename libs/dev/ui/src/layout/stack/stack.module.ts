import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StackComponent } from './stack.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StackComponent],
  exports: [StackComponent]
})
export class StackModule {}
