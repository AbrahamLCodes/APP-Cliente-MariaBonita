import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(public alertController: AlertController,public modalController: ModalController) { }

  ngOnInit() {
  }


  async sucursales() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Categorías',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Categoría 1',
          value: 'Categoria 1',
          handler: () => {
            console.log('Categoria 1');
          },
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Categoría 2',
          value: 'Categoria 2',
          handler: () => {
            console.log('Categoria 2');
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cerrar');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirmar');
          }
        }
      ]
    });

    await alert.present();
  }


  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Categorías',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Categoría 1',
          value: 'Categoria 1',
          handler: () => {
            console.log('Categoria 1');
          },
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Categoría 2',
          value: 'Categoria 2',
          handler: () => {
            console.log('Categoria 2');
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cerrar');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirmar');
          }
        }
      ]
    });

    await alert.present();
  }

}
