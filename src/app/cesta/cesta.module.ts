import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CestaPageRoutingModule } from './cesta-routing.module';

import { CestaPage } from './cesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CestaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CestaPage]
})
export class CestaPageModule {}
