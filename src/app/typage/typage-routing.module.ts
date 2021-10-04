import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypagePage } from './typage.page';

const routes: Routes = [
  {
    path: '',
    component: TypagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypagePageRoutingModule {}
