import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClikForms } from '../cliktools/clikforms';
import { ClikTools } from '../cliktools/cliktools';
import { ApiclientService } from '../servicios/apiclient.service';
import { DireccionService } from '../servicios/direcciones.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-misdirecciones',
  templateUrl: './misdirecciones.page.html',
  styleUrls: ['./misdirecciones.page.scss'],
})
export class MisdireccionesPage implements OnInit {

  public usuario: any
  public direcciones: any = []

  constructor(
    private sesionService: SesionService,
    private apiclient: ApiclientService,
    private clikTools: ClikTools,
    private clikForms: ClikForms,
    private router: Router,
    private alertController: AlertController,
    private direccionService: DireccionService
  ) { }

  ngOnInit() {
    this.usuario = this.sesionService.getObjectUsuario()
  }

  ionViewDidEnter() {
    this.cargarDirecciones()
  }

  public seleccionarDireccion(direccion) {
    this.apiclient.seleccionarDireccion(direccion).subscribe((response => {
      if (response[0].hasOwnProperty("id")) {
        this.cargarDirecciones()
      }
    }))
  }

  public async eliminarDireccion(direccion){
    const alerta = await this.alertController.create({
      header: "Delete Address",
      message: "Are you sure you want to delete this address?",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Delete",
          handler: ()=> {
            this.apiclient.eliminarDato("direcciones", direccion.id).subscribe(response => {
              if(response.hasOwnProperty("id")){
                this.cargarDirecciones()
              }
            })
          }
        }
      ]
    })
    alerta.present()
  }

  cargarDirecciones() {
    this.apiclient.obtenerDatos("direcciones").subscribe((response: any) => {
      this.direcciones = response.filter(direccion => direccion.usuario.id == this.usuario.id)
    })
  }

  public nuevaDireccion() {
    this.direccionService.setNuevaDireccion()
    this.router.navigateByUrl("adddireccion")
  }

  public editarDireccion(direccion) {
    this.direccionService.setEditarDireccion(direccion)
    this.router.navigateByUrl("adddireccion")
  }
}
