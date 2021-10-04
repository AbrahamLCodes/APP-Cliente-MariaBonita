import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonederoPage } from './monedero.page';

const routes: Routes = [
  {
    path: '',
    component: MonederoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonederoPageRoutingModule {}
