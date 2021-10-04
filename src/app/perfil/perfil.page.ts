import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public usuario: any

  constructor(
    public alertController: AlertController,
    public router: Router,
    private sesionService: SesionService
  ) { }

  ngOnInit() {
    this.usuario = this.sesionService.getObjectUsuario()
    console.log(this.usuario);
    
  }

  public async cerrarSesion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar sesión',
      message: '¿Estas seguro de realizar esta acción?',
      translucent: true,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: "Confirmar",
          handler: () => {
            this.sesionService.logout()
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminarUser() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar mi cuenta',
      message: '¿Estas seguro de realizar esta acción?',
      translucent: true,
      inputs: [
        {
          name: 'SI',
          type: 'radio',
          label: 'Si',
          value: 'Si',
          handler: () => {
            console.log('Radio 1 selected');
          },
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.router.navigateByUrl("/home");
          }
        }
      ]
    });

    await alert.present();
  }


}
