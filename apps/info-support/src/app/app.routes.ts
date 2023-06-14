import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'handbook',
    loadChildren: () => import('@info-support/handbook').then((m) => m.HandbookModule)
  }
];
