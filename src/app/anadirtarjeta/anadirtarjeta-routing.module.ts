import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirtarjetaPage } from './anadirtarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirtarjetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirtarjetaPageRoutingModule {}
