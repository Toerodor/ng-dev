import { Component } from '@angular/core';

@Component({
  selector: 'd-panel',
  template: `
    <div class='flex' style='padding: 8px 20px; border-bottom: 1px solid #E5E5E5'>
      <div class='grow'>Title</div>
      <div>Actions</div>
    </div>
    <div style='padding: 8px 20px;'>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      border: 1px solid #E5E5E5
    }
  `]
})
export class PanelComponent {

}

