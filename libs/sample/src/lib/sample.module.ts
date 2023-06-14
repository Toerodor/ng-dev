import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sampleRoutes } from './sample.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(sampleRoutes)],
})
export class SampleModule {}
