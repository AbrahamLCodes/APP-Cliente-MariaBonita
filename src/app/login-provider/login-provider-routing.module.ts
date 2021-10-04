import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginProviderPage } from './login-provider.page';

const routes: Routes = [
  {
    path: '',
    component: LoginProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginProviderPageRoutingModule {}
