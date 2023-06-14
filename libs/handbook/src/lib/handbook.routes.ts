import { Route } from '@angular/router';

import { HandbookComponent } from './handbook.component';

export const handbookRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: HandbookComponent }
];
