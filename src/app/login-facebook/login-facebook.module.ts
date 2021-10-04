import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginFacebookPageRoutingModule } from './login-facebook-routing.module';

import { LoginFacebookPage } from './login-facebook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginFacebookPageRoutingModule
  ],
  declarations: [LoginFacebookPage]
})
export class LoginFacebookPageModule {}
