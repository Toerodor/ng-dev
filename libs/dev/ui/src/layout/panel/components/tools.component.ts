import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'dk-panel-tools',
  template: `
    <ng-template>
      <div class='dk-panel-tools'>
        <ng-content></ng-content>
      </div>
    </ng-template>`
})
export class PanelToolsComponent {
  @ViewChild(TemplateRef, { static: true })
  public templateRef!: TemplateRef<unknown>;
}
