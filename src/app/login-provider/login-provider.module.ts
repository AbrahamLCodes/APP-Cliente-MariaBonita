import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginProviderPageRoutingModule } from './login-provider-routing.module';

import { LoginProviderPage } from './login-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginProviderPageRoutingModule
  ],
  declarations: [LoginProviderPage]
})
export class LoginProviderPageModule {}
