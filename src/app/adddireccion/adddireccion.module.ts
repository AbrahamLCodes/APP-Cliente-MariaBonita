import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdddireccionPageRoutingModule } from './adddireccion-routing.module';

import { AdddireccionPage } from './adddireccion.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdddireccionPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC3QCWQ4xySdmPUdXOwUJRjPScjXT6SBTU"
    })
  ],
  declarations: [AdddireccionPage]
})
export class AdddireccionPageModule {}
