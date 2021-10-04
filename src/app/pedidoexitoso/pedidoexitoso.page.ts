import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClikTools } from '../cliktools/cliktools';
import { ApiclientService } from '../servicios/apiclient.service';
import { AppService } from '../servicios/app.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-pedidoexitoso',
  templateUrl: './pedidoexitoso.page.html',
  styleUrls: ['./pedidoexitoso.page.scss'],
})
export class PedidoexitosoPage implements OnInit {

  public ordenPendiente: any
  public usuario: any

  constructor(
    public appService: AppService,
    private sesionService: SesionService,
    public apiclient: ApiclientService,
    private alertController: AlertController,
    private cliktools: ClikTools,
    private router: Router
  ) { }

  ngOnInit() {

  }

  async ionViewDidEnter() {
    this.ordenPendiente = await this.appService.obtenerOrdenPendiente()
    console.log(this.ordenPendiente);

    setInterval(() => {
      this.cargarOrdenPendiente()
    }, 7000);

    this.usuario = this.sesionService.getObjectUsuario()
  }

  public async cargarOrdenPendiente() {
    this.ordenPendiente = await this.appService.obtenerOrdenPendiente()
    if (this.ordenPendiente.finalizado) {
      this.apiclient.obtenerDatoEspecifico("users", this.usuario.id).subscribe(response => {
        this.sesionService.setUsuario(JSON.stringify(response))
        this.usuario = this.sesionService.getObjectUsuario()
        this.router.navigateByUrl("inicio").then(_ => {
          window.location.reload()
        })
      })
    }
  }

  public async cancelarPedido() {
    const alert = await this.alertController.create({
      header: "Cancel order",
      message: "Are you sure you want to cancel this order?",
      buttons: [
        {
          text: "No"
        },
        {
          text: "Yes",
          handler: () => {
            this.apiclient.actualizarDato("pedidos", this.ordenPendiente.id, { cancelado: true })
              .subscribe((response => {
                if (response.hasOwnProperty("id")) {
                  this.cliktools.warningToast("Tu pedido se ha cancelado")
                  this.apiclient.actualizarDato("users", this.usuario.id, { pedido_pendiente: false }).subscribe((response => {
                    if (response.hasOwnProperty("id")) {
                      this.router.navigateByUrl("inicio").then(_ => {
                        window.location.reload()
                      })
                    }
                  }))
                }
              }))
          }
        }
      ]
    })

    alert.present()
  }

}
