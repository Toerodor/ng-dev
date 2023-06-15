import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelToolsComponent } from './components/tools.component';
import { PanelFooterComponent } from './components/footer.component';
import { PanelTitleComponent } from './components/title.component';

import { PanelComponent } from './panel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PanelComponent, PanelToolsComponent, PanelFooterComponent, PanelTitleComponent],
  exports: [PanelComponent, PanelToolsComponent, PanelFooterComponent, PanelTitleComponent]
})
export class PanelModule {}
