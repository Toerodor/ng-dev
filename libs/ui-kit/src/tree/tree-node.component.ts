import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input, NgZone, OnInit,
  ViewEncapsulation
} from '@angular/core';

import { TreeComponent } from './tree.component';
import { NodeType } from './types';
import { fromEvent, throttleTime } from 'rxjs';


@Component({
  selector: 'x-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.draggable]': 'true'
  }
})
export class TreeNodeComponent<T> implements OnInit {

  @Input({ required: true }) node!: NodeType<T>;

  @HostBinding('class.x-tree-node') hostClass = true;

  tree: TreeComponent<T> = inject(TreeComponent);
  ngZone: NgZone = inject(NgZone);
  elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  get indent() {
    return Array(this.node.level);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const nativeElement = this.elementRef.nativeElement;

      fromEvent<DragEvent>(nativeElement, 'dragstart')
        .subscribe((e: DragEvent) => {
          this.tree.draggedNode = this;
          console.log(this.tree.draggedNode?.node.internalId);
        });

      fromEvent<DragEvent>(nativeElement, 'dragenter')
        .subscribe((e: DragEvent) => {
          // console.log('dragenter', this.tree.draggedNode?.node.internalId, this.node.internalId);


        });

      fromEvent<DragEvent>(nativeElement, 'dragover')
        .pipe(throttleTime(1))
        .subscribe((e: DragEvent) => {
          e?.preventDefault();

          const nodeRect = this.elementRef.nativeElement.getBoundingClientRect();

          const nodeTop = nodeRect.top;
          const nodeHeight = nodeRect.height;

          console.log(nodeTop);

          // const { top, height } = this.elementRef.nativeElement.getBoundingClientRect();
          // const division = height / 3;
          // const position = e.clientY - top;

          // const { clientY } = e;
          // const { top, height } = (e.target as Element).getBoundingClientRect();
          //
          // const position = clientY - top;
          // const nodeDiv= height / 3
          //
          // console.log(top, nodeDiv);

          // switch (true) {
          //   case position < top + division:
          //     console.log('Before');
          //     break;
          //   case position >= top + height - division:
          //     console.log('Before');
          //     break;
          //   default:
          //     console.log('Over');
          // }


        });

      fromEvent<DragEvent>(nativeElement, 'dragleave')
        .subscribe((e: DragEvent) => {
          console.log('dragleave');
        });

      fromEvent<DragEvent>(nativeElement, 'drop')
        .subscribe((e: DragEvent) => {
          console.log('drop');
        });

      fromEvent<DragEvent>(nativeElement, 'dragend')
        .subscribe((e: DragEvent) => {
          this.tree.draggedNode = null;
        });

    });
  }

  handleLabelClick($event: MouseEvent) {
    this.tree.nodeClick.emit($event);
  }

}
