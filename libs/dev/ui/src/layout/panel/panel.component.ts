import { ChangeDetectionStrategy, Component, ContentChild, ViewEncapsulation } from '@angular/core';

import { PanelTitleComponent } from './components/title.component';
import { PanelToolsComponent } from './components/tools.component';
import { PanelFooterComponent } from './components/footer.component';

@Component({
  selector: 'dk-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'dk-panel'
  }
})
export class PanelComponent {

  @ContentChild(PanelTitleComponent)
  public titleComponent: PanelTitleComponent | null = null;

  @ContentChild(PanelToolsComponent)
  public toolsComponent: PanelToolsComponent | null = null;

  @ContentChild(PanelFooterComponent)
  public footerComponent: PanelFooterComponent | null = null;
}

