import { Component, Input } from '@angular/core';

@Component({
  selector: 'dk-stack',
  template: '',
})
export class StackComponent {

  @Input() direction: 'vertical' | 'horizontal' = 'horizontal';

}
