import { Component, OnInit } from '@angular/core';
import { AppService } from '../servicios/app.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.page.html',
  styleUrls: ['./mispedidos.page.scss'],
})
export class MispedidosPage implements OnInit {

  pedidos: any = []
  usuario: any 

  constructor(
    private appService: AppService,
    private sesionService: SesionService
  ) { }

  ngOnInit() {
    this.cargarUsuario()
  }

  async cargarPedidos(){
    this.pedidos = await this.appService.obtenerPedidosDeUsuario()
    console.log(this.pedidos);
    
  }

  cargarUsuario(){
    this.usuario = this.sesionService.getObjectUsuario()
    this.cargarPedidos()
  }

}
