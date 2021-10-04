import { Component, OnInit } from '@angular/core';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-monedero',
  templateUrl: './monedero.page.html',
  styleUrls: ['./monedero.page.scss'],
})
export class MonederoPage implements OnInit {

  public usuario: any

  constructor(
    private sesionService: SesionService
  ) { }

  ngOnInit() {
    this.usuario = this.sesionService.getObjectUsuario()
    console.log(this.usuario);
    
  }

}
