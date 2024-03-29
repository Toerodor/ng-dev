import { Component, ViewEncapsulation } from '@angular/core';

type TTT = {
  id: number;
  pid?: number;
  label: string;
  expanded?: boolean;
  children?: TTT[];
}

@Component({
  selector: 'h-classifier-list',
  templateUrl: './classifier-list.component.html',
  styleUrls: ['./classifier-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClassifierListComponent {
  treeData: TTT[] = [
    {
      id: 1,
      label: 'Классификатор типов интегрированных структур для организаций ',
      expanded: true,
      children: [
        {
          id: 5,
          label: 'Классификатор типов интегрированных структур для организаций ',
          pid: 1,
          expanded: true,
          children: [
            {
              id: 21,
              label: 'Классификатор типов интегрированных структур для организаций ',
              pid: 5
            },
            {
              id: 22,
              label: 'Классификатор типов интегрированных структур для организаций ',
              pid: 5
            },
            {
              id: 23,
              label: 'Классификатор типов интегрированных структур для организаций ',
              pid: 5
            },
            {
              id: 24,
              label: 'Классификатор типов интегрированных структур для организаций ',
              pid: 5
            }
          ]
        },
        {
          id: 6,
          label: ' Классификатор типов интегрированных структур для организаций ',
          pid: 1
        },
        {
          id: 7,
          label: ' Классификатор типов интегрированных структур для организаций ',
          pid: 1
        },
        {
          id: 8,
          label: ' Классификатор типов интегрированных структур для организаций ',
          pid: 1
        }
      ]
    },
    {
      id: 2,
      label: ' Классификатор типов интегрированных структур для организаций ',
      children: [
        {
          id: 9,
          label: ' Классификатор типов интегрированных структур для организаций ',
          pid: 2
        },
        {
          id: 10,
          label: ' Классификатор типов интегрированных структур для организаций ',
          pid: 2
        },
        {
          id: 11,
          label: ' Классификатор типов интегрированных структур для организаций ',
          pid: 2
        },
        {
          id: 12,
          label: ' Классификатор типов интегрированных структур для организаций ',
          pid: 2
        }
      ]
    },
    {
      id: 3,
      label: ' Классификатор типов интегрированных структур для организаций ',
      children: [
        {
          id: 13,
          label: ' Классификатор типов интегрированных структур для организаций ',
          pid: 3
        },
        {
          id: 14,
          label: ' Классификатор типов интегрированных структур для организаций ',
          pid: 3
        },
        {
          id: 15,
          label: ' Классификатор типов интегрированных структур для организаций ',
          pid: 3
        },
        {
          id: 16,
          label: ' Классификатор типов интегрированных структур для организаций ',
          pid: 3
        }
      ]
    }
  ];

  handleNodeClick(event: MouseEvent) {
    console.log(event);
  }
}
