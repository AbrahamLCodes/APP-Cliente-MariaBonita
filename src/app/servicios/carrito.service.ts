import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CarritoService {

    private NOMBRE_CARRITO = "carritoFRESHCO"
    public carritoCount = new BehaviorSubject<number>(0)

    constructor(
        private router: Router
    ) { }

    /*
        Estructura del JSON
        carrito: [
            {
                producto: (JSON producto),
                opcionales: [] (Array de opcionales agregados al carrito),
                subtotal: suma del precio del producto + los opcionales
            }
        ]
    */

    public agregarProducto(producto) {
        if (!sessionStorage.getItem(this.NOMBRE_CARRITO)) {
            sessionStorage.setItem(this.NOMBRE_CARRITO, JSON.stringify([]))
        }

        const carrito = this.getObjectCarrito()
        carrito.push(producto)
        sessionStorage.setItem(this.NOMBRE_CARRITO, JSON.stringify(carrito))

        this.setCarritoCount()
    }

    public eliminarProducto(index) {
        const carrito = this.getObjectCarrito()
        carrito.splice(index, 1)
        sessionStorage.setItem(this.NOMBRE_CARRITO, JSON.stringify(carrito))

        this.setCarritoCount()
    }

    public getObjectCarrito() {
        return JSON.parse(sessionStorage.getItem("carritoFRESHCO"))
    }

    public setCarritoCount(){
        this.carritoCount.next(this.getObjectCarrito().length)
    }

    public getCarritoCount(){
        return this.carritoCount.asObservable()
    }

    public limpiarCarrito(){
        sessionStorage.setItem(this.NOMBRE_CARRITO, JSON.stringify([]))
    }

}