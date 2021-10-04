import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from './carrito.service';

@Injectable({
    providedIn: 'root'
})
export class ComprasService {

    private NOMBRE_COMPRA = "comprasFRESHCO"

    constructor(
        private carritoService: CarritoService
    ) { }

    public getCompraObject(){
        return JSON.parse(sessionStorage.getItem(this.NOMBRE_COMPRA))
    }

    public setCompra(subtotal, propina, total) {
        if (!sessionStorage.getItem(this.NOMBRE_COMPRA)) {
            sessionStorage.setItem(this.NOMBRE_COMPRA, JSON.stringify({}))
        }

        const carrito = this.carritoService.getObjectCarrito()  
        const detallesCompra = {
            subtotal,
            propina,
            total,
            carrito
        }
        
        sessionStorage.setItem(this.NOMBRE_COMPRA, JSON.stringify(detallesCompra))
    }

    public deleteCompra() {
        sessionStorage.removeItem(this.NOMBRE_COMPRA)
    }
}