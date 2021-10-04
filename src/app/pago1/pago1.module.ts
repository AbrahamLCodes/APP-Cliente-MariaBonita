import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pago1PageRoutingModule } from './pago1-routing.module';

import { Pago1Page } from './pago1.page';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pago1PageRoutingModule,
    NgxStripeModule.forChild('pk_test_71fBM87Dcnetxs6Yj88ae3uQ00MJqSR1w3'),
    ReactiveFormsModule
  ],
  declarations: [Pago1Page]
})
export class Pago1PageModule {}
