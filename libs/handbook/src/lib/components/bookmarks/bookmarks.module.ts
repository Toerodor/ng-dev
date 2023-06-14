import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookmarksComponent } from './bookmarks.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BookmarksComponent],
  exports: [BookmarksComponent]
})
export class BookmarksModule {
}
