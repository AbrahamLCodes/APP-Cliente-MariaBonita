import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtarjetaPageRoutingModule } from './addtarjeta-routing.module';

import { AddtarjetaPage } from './addtarjeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtarjetaPageRoutingModule
  ],
  declarations: [AddtarjetaPage]
})
export class AddtarjetaPageModule {}
