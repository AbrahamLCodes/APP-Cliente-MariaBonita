import { Injectable } from '@angular/core';
import { ApiclientService } from './apiclient.service';
import { SesionService } from './sesion.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private apiclient: ApiclientService,
        private sesionService: SesionService
    ) { }

    async cargarProductos() {
        let productos: any
        await this.apiclient.obtenerDatos("productos").toPromise().then((response: any) => {
            productos = response
        })
        return productos
    }

    async cargarSucursales() {
        let sucursales: any
        await this.apiclient.obtenerDatos("sucursales").toPromise().then((response: any) => {
            sucursales = response
        })
        return sucursales
    }

    async cargarCategorias() {
        let categorias: any
        await this.apiclient.obtenerDatos("categorias").toPromise().then((response: any) => {
            categorias = response
        })
        return categorias
    }

    async cargarExtras() {
        let extras: any
        await this.apiclient.obtenerDatos("extras").toPromise().then((response: any) => {
            extras = response
        })
        return extras
    }

    async cargarTipos() {
        let tipos: any
        await this.apiclient.obtenerDatos("tipos").toPromise().then((response: any) => {
            tipos = response
        })
        return tipos
    }

    public getImagen(url: string, background: boolean): string {
        if (background) {
            return this.apiclient.getBackgroundImagenURL(url)
        } else {
            return this.apiclient.getImagenURL(url)
        }
    }

    public async obtenerOrdenPendiente(){
        let pedido 
        const usuario = this.sesionService.getObjectUsuario()
       await this.apiclient.obtenerDatosEspecificosDeTipo(
           "pedidos", 
           "cliente", 
           usuario.id
        ).toPromise().then((response : any) => {
            pedido = response[response.length - 1]
        })
        return pedido
    }

    public async obtenerPedidosDeUsuario(){
        let pedidos
        const usuario = this.sesionService.getObjectUsuario()
       await this.apiclient.obtenerDatosEspecificosDeTipo(
           "pedidos", 
           "cliente", 
           usuario.id
        ).toPromise().then((response : any) => {
            pedidos = response
        })
        return pedidos
    }

    async cargarDireccionesDeUsuario() {
        let direcciones = []
        const usuario = this.sesionService.getObjectUsuario()
        await this.apiclient.obtenerDatosEspecificosDeTipo(
            "direcciones",
            "usuario",
            usuario.id
        ).toPromise().then((response: any) => {
            direcciones = response
        })
        return direcciones
    }

    async cargarTarjetasDeUsuario() {
        let tarjetas = []
        const usuario = this.sesionService.getObjectUsuario()
        await this.apiclient.obtenerDatosEspecificosDeTipo(
            "tarjetas",
            "usuario",
            usuario.id
        ).toPromise().then((response: any) => {
            tarjetas = response
        })
        return tarjetas
    }
}