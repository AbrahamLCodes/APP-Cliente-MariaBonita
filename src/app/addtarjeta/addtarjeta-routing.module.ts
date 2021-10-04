import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtarjetaPage } from './addtarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: AddtarjetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtarjetaPageRoutingModule {}
