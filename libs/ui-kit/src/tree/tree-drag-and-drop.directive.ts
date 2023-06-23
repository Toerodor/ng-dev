import { fromEvent, Subject, takeUntil } from 'rxjs';

import { AfterViewInit, DestroyRef, Directive, inject, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Node } from './types';
import { TreeComponent } from './tree.component';
import { TreeNodeComponent } from './tree-node.component';


@Directive({
  selector: 'x-tree[x-drag-and-drop], x-tree[xDragAndDrop]'
})
export class TreeDragAndDropDirective<T> implements AfterViewInit {

  protected renderer = inject(Renderer2);
  protected destroyRef = inject(DestroyRef);
  protected treeComponent = inject(TreeComponent);

  protected nodeChanged$!: Subject<void>;

  protected draggingIdx: string[] = [];

  public ngAfterViewInit(): void {
    this.treeComponent.nodesQueryList
      .changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.nodesQueryListChanged());

    this.nodesQueryListChanged();
  }

  protected nodesQueryListChanged() {
    const treeNodeComponents: TreeNodeComponent<T>[] = this.treeComponent.nodesQueryList.toArray();

    this.nodeChanged$?.next();
    this.nodeChanged$?.complete();

    this.nodeChanged$ = new Subject<void>();
    treeNodeComponents.forEach((node) => {
      const nativeElement = node.elementRef.nativeElement;
      this.renderer.setAttribute(nativeElement, 'draggable', 'true');

      fromEvent<DragEvent>(nativeElement, 'dragstart')
        .pipe(takeUntil(this.nodeChanged$))
        .subscribe((event) => this.handleNodeDragStart(event, node));
      fromEvent<DragEvent>(nativeElement, 'dragenter')
        .pipe(takeUntil(this.nodeChanged$))
        .subscribe((event) => this.handleNodeDragEnter(event, node));
      fromEvent<DragEvent>(nativeElement, 'dragover')
        .pipe(takeUntil(this.nodeChanged$))
        .subscribe((event) => this.handleNodeDragOver(event, node));
      fromEvent<DragEvent>(nativeElement, 'dragleave')
        .pipe(takeUntil(this.nodeChanged$))
        .subscribe((event) => this.handleNodeDragLeave(event, node));
      fromEvent<DragEvent>(nativeElement, 'drop')
        .pipe(takeUntil(this.nodeChanged$))
        .subscribe((event) => this.handleNodeDrop(event, node));
      fromEvent<DragEvent>(nativeElement, 'dragend')
        .pipe(takeUntil(this.nodeChanged$))
        .subscribe((event) => this.handleNodeDragEnd(event, node));
    });
  }

  protected handleNodeDragStart(event: DragEvent, nodeComponent: TreeNodeComponent<T>) {
    const node = nodeComponent.node;

    this.draggingIdx = [];



    // const fn = (node: Node<T>) => {
    //   this.draggingIdx.push(node.key);
    //   for (const child of node.children) {
    //     this.draggingIdx.push(child.key);
    //
    //     child.children && fn(child);
    //   }
    // };
    //
    // fn(nodeComponent.node);
    // for (const n of node.node.children) {
    //   this.draggingIdx.push()
    // }

    console.log(event, nodeComponent);
  }

  protected handleNodeDragEnter(event: DragEvent, node: TreeNodeComponent<T>) {
    console.log(event, node);
  }

  protected handleNodeDragOver(event: DragEvent, node: TreeNodeComponent<T>) {
    console.log(event, node);
  }

  protected handleNodeDragLeave(event: DragEvent, node: TreeNodeComponent<T>) {
    console.log(event, node);
  }

  protected handleNodeDrop(event: DragEvent, node: TreeNodeComponent<T>) {
    console.log(event, node);
  }

  protected handleNodeDragEnd(event: DragEvent, node: TreeNodeComponent<T>) {
    console.log(event, node);
    this.draggingIdx = [];
  }

}
