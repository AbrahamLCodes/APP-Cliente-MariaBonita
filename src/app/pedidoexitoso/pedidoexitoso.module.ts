import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoexitosoPageRoutingModule } from './pedidoexitoso-routing.module';

import { PedidoexitosoPage } from './pedidoexitoso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoexitosoPageRoutingModule
  ],
  declarations: [PedidoexitosoPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PedidoexitosoPageModule {}
