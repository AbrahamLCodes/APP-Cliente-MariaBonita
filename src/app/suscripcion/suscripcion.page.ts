import { Component, OnInit } from '@angular/core';
import { ApiclientService } from '../servicios/apiclient.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.page.html',
  styleUrls: ['./suscripcion.page.scss'],
})
export class SuscripcionPage implements OnInit {

  public usuario: any

  constructor(
    private sesionService: SesionService,
    private apiclient: ApiclientService
  ) {

  }

  ngOnInit() {
    this.usuario = this.sesionService.getObjectUsuario()
    console.log(this.usuario);

  }

  updateUsuario(tipo) {
    switch (tipo) {
      case "news":
        if (this.usuario.nuevos_platillos) {
          this.usuario.nuevos_platillos = false
        } else {
          this.usuario.nuevos_platillos = true
        }
        break
      case "promos":
        if (this.usuario.recibir_promociones) {
          this.usuario.recibir_promociones = false
        } else {
          this.usuario.recibir_promociones = true
        }
        break
      case "seasonal":
        if (this.usuario.recibir_platillos_temporada) {
          this.usuario.recibir_platillos_temporada = false
        } else {
          this.usuario.recibir_platillos_temporada = true
        }
        break
      case "birthday":
        if (this.usuario.recibir_promociones_cumple) {
          this.usuario.recibir_promociones_cumple = false
        } else {
          this.usuario.recibir_promociones_cumple = true
        }
        break
    }

    console.log(this.usuario.nuevos_platillos);
    console.log(this.usuario.recibir_promociones);
    console.log(this.usuario.recibir_platillos_temporada);
    console.log(this.usuario.recibir_promociones_cumple);

    this.apiclient.actualizarDato("users", this.usuario.id, {
      nuevos_platillos: this.usuario.nuevos_platillos,
      recibir_promociones: this.usuario.recibir_promociones,
      recibir_platillos_temporada: this.usuario.recibir_platillos_temporada,
      recibir_promociones_cumple: this.usuario.recibir_promociones_cumple
    }).subscribe((response: any) => {
      this.sesionService.setUsuario(JSON.stringify(response))
      this.usuario = this.sesionService.getObjectUsuario()
      console.log(this.usuario);

    })
  }

}
