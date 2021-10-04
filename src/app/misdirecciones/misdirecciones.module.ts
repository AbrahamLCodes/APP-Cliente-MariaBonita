import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisdireccionesPageRoutingModule } from './misdirecciones-routing.module';

import { MisdireccionesPage } from './misdirecciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisdireccionesPageRoutingModule
  ],
  declarations: [MisdireccionesPage]
})
export class MisdireccionesPageModule {}
