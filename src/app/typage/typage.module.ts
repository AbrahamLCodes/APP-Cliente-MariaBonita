import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypagePageRoutingModule } from './typage-routing.module';

import { TypagePage } from './typage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypagePageRoutingModule
  ],
  declarations: [TypagePage]
})
export class TypagePageModule {}
