import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoexitosoPage } from './pedidoexitoso.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoexitosoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoexitosoPageRoutingModule {}
