import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonederoPageRoutingModule } from './monedero-routing.module';

import { MonederoPage } from './monedero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonederoPageRoutingModule
  ],
  declarations: [MonederoPage]
})
export class MonederoPageModule {}
