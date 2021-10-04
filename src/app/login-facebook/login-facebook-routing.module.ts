import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFacebookPage } from './login-facebook.page';

const routes: Routes = [
  {
    path: '',
    component: LoginFacebookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginFacebookPageRoutingModule {}
