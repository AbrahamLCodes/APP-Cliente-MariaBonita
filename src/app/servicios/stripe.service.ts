import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from './carrito.service';

import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { ApiclientService } from './apiclient.service';
@Injectable({
    providedIn: 'root'
})
export class ServicioStripe {

    private stripe: any
    private card: any

    constructor(
        private apiClient: ApiclientService
    ) {
    }

    async charge(cantidad, token){
        
        
    }
}