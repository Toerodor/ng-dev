import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dk-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'dk-property-list'
  }
})
export class PropertyListComponent {

  @Input()
  public columns!: number | string;


  @HostBinding('style.grid-template-columns')
  get computedColumns() {
    return `repeat(${this.columns ?? 1}, 1fr)`;
  }

}

