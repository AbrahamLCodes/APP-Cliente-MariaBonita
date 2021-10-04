import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisdireccionesPage } from './misdirecciones.page';

const routes: Routes = [
  {
    path: '',
    component: MisdireccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisdireccionesPageRoutingModule {}
