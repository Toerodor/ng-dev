import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlineInputControlDirective } from './directives/control.directive';

import { InlineInputComponent } from './inline-input.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InlineInputComponent, InlineInputControlDirective],
  exports: [InlineInputComponent, InlineInputControlDirective]
})
export class InlineInputModule {
}
