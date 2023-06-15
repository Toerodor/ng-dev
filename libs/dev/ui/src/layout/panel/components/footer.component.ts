import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'dk-panel-footer',
  template: `
    <ng-template>
      <div class='dk-panel-footer'>
        <ng-content></ng-content>
      </div>
    </ng-template>`
})
export class PanelFooterComponent {
  @ViewChild(TemplateRef, { static: true })
  public templateRef!: TemplateRef<unknown>;
}
