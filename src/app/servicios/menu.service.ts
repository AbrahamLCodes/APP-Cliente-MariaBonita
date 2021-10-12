import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private PRODUCTO_NOMBRE = "productoItemFRESHCO"
    private SUCURSAL_NOMBRE = "sucursalItemFRESHCO"

    constructor(
    ) { }

    public setProductoItem(producto: any) {
        sessionStorage.setItem(this.PRODUCTO_NOMBRE, JSON.stringify(producto))
    }

    public getProductoItemObj() {
        return JSON.parse(sessionStorage.getItem(this.PRODUCTO_NOMBRE))
    }

    public clearProductoItem() {
        sessionStorage.removeItem(this.PRODUCTO_NOMBRE)
    }

    public setSucursalItem(sucursal: any) {
        sessionStorage.setItem(this.SUCURSAL_NOMBRE, JSON.stringify(sucursal))
    }

    public getSucursalItemObj() {        
        return JSON.parse(sessionStorage.getItem(this.SUCURSAL_NOMBRE))
    }

    public clearSucursalItem() {
        sessionStorage.removeItem(this.SUCURSAL_NOMBRE)
    }
}