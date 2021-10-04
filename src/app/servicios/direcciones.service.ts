import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from './carrito.service';

import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { ApiclientService } from './apiclient.service';
@Injectable({
    providedIn: 'root'
})
export class DireccionService {

    private DIRECCION_ESTADO = "direccionEstadoFRESHCO"

    constructor() {}

    setNuevaDireccion() {
        if (!sessionStorage.getItem(this.DIRECCION_ESTADO)) {
            sessionStorage.setItem(this.DIRECCION_ESTADO, JSON.stringify({}))
        }

        sessionStorage.setItem(this.DIRECCION_ESTADO, JSON.stringify({ nuevo: true }))
    }

    setEditarDireccion(direccion) {
        if (!sessionStorage.getItem(this.DIRECCION_ESTADO)) {
            sessionStorage.setItem(this.DIRECCION_ESTADO, JSON.stringify({}))
        }

        sessionStorage.setItem(this.DIRECCION_ESTADO, JSON.stringify({ nuevo: false, direccion: direccion }))
    }

    getEstadoObj(): any {
        return JSON.parse(sessionStorage.getItem(this.DIRECCION_ESTADO))
    }

    getDireccionEditando(): any {
        const estado = this.getEstadoObj()
        return estado.direccion
    }
}