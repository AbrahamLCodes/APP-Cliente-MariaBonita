import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})

export class ClikMaps {

    constructor(
        private geolocation: Geolocation,
        private alert: AlertController
    ) { }

    watchPosition(options?: GeolocationOptions) {
        return this.geolocation.watchPosition(options);
      }
    
      getPosition() {
        return this.geolocation.getCurrentPosition();
      }
}