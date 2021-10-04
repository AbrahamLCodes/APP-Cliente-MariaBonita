import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pago1Page } from './pago1.page';

const routes: Routes = [
  {
    path: '',
    component: Pago1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pago1PageRoutingModule {}
