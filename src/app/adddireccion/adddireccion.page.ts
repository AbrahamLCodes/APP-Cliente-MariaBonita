import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClikMaps } from '../cliktools/clikMaps';
import { ApiclientService } from '../servicios/apiclient.service';
import { SesionService } from '../servicios/sesion.service';
import { Location } from '@angular/common';
import { ClikTools } from '../cliktools/cliktools';
import { DireccionService } from '../servicios/direcciones.service';

@Component({
  selector: 'app-adddireccion',
  templateUrl: './adddireccion.page.html',
  styleUrls: ['./adddireccion.page.scss'],
})
export class AdddireccionPage implements OnInit {

  public direccion = ""
  public nombre = ""
  public usuario: any

  public editar = false

  public coordenadasCentro = {
    lat: 31.772543,
    lng: -106.460953,
  }

  public coordenadas: any

  public direccionSelected: any

  constructor(
    private clikMaps: ClikMaps,
    private clikTools: ClikTools,
    private apiclient: ApiclientService,
    private sesionService: SesionService,
    private router: Router,
    private _location: Location,
    private route: ActivatedRoute,
    private direccionService: DireccionService
  ) { }

  ngOnInit() {
    this.usuario = this.sesionService.getObjectUsuario()
    const estado = this.direccionService.getEstadoObj()
    const nuevaDireccion = estado.nuevo
    if (nuevaDireccion) {
      this.editar = false
    } else {
      this.editar = true
    }

    if (this.editar) {
      this.direccionSelected = estado.direccion

      this.coordenadas = {
        latitude: Number(this.direccionSelected.latitud),
        longitude: Number(this.direccionSelected.longitud)
      }

      this.coordenadasCentro.lat = Number(this.direccionSelected.latitud)
      this.coordenadasCentro.lng = Number(this.direccionSelected.longitud)

      this.direccion = this.direccionSelected.direccion
      this.nombre = this.direccionSelected.nombre
    } else {
      this.clikMaps.getPosition().then((data) => {
        this.coordenadas = data.coords;
        this.coordenadasCentro.lat = data.coords.latitude;
        this.coordenadasCentro.lng = data.coords.longitude;
      }).catch((err) => {
        console.log("ERROR", err);
      });
    }
  }

  submitDireccion() {
    if (
      (this.nombre !== undefined && this.nombre !== null && this.nombre.length > 0)
      &&
      (this.direccion !== undefined && this.direccion !== null && this.direccion.length > 0)
    ) {
      if (this.editar) {
        this.apiclient.actualizarDato("direcciones", this.direccionSelected.id, {
          latitud: this.coordenadasCentro.lat + "",
          longitud: this.coordenadasCentro.lng + "",
          usuario: this.usuario.id,
          direccion: this.direccion,
          nombre: this.nombre
        }).subscribe(response => {
          if (response.hasOwnProperty("id")) {
            this.clikTools.customToast("Address updated succesfully!", "primary")
            this._location.back();
          }
        })
      } else {
        this.apiclient.crearDato("direcciones", {
          latitud: this.coordenadasCentro.lat + "",
          longitud: this.coordenadasCentro.lng + "",
          usuario: this.usuario.id,
          direccion: this.direccion,
          nombre: this.nombre
        }).subscribe(response => {
          if (response.hasOwnProperty("id")) {
            this.clikTools.customToast("Address saved succesfully!", "primary")
            this._location.back();
          }
        })
      }
    } else {
      this.clikTools.warningToast("Invalid fields")
    }

  }

  cambiarCoordenada(evento: { lat: number, lng: number }) {
    this.coordenadasCentro.lat = evento.lat;
    this.coordenadasCentro.lng = evento.lng;
  }

  mouseUp() {
    this.apiclient.getDireccion(this.coordenadasCentro.lat, this.coordenadasCentro.lng).subscribe((response: any) => {
      this.direccion = response.results[0].formatted_address
    })
  }
}
