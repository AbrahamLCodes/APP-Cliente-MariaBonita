import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirtarjetaPageRoutingModule } from './anadirtarjeta-routing.module';

import { AnadirtarjetaPage } from './anadirtarjeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirtarjetaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AnadirtarjetaPage]
})
export class AnadirtarjetaPageModule {}
