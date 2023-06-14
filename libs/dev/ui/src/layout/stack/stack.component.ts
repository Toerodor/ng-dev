import { Component, Input } from '@angular/core';

@Component({
  selector: 'd-stack',
  template: '',
})
export class StackComponent {

  @Input() direction: 'vertical' | 'horizontal' = 'horizontal';

}
