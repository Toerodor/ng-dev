import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'dk-panel-title',
  template: `
    <ng-template>
      <div class='dk-panel-title'>
        <ng-content></ng-content>
      </div>
    </ng-template>`
})
export class PanelTitleComponent {
  @ViewChild(TemplateRef, { static: true })
  public templateRef!: TemplateRef<unknown>;
}
