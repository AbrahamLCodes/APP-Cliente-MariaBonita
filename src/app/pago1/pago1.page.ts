import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ComprasService } from '../servicios/compras.service';
import { SesionService } from '../servicios/sesion.service';
import { AppService } from '../servicios/app.service';
import { ClikTools } from '../cliktools/cliktools';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { ServicioStripe } from '../servicios/stripe.service';
import { ApiclientService } from '../servicios/apiclient.service';
import { ClikFechas } from '../cliktools/clikfechas';
import { CarritoService } from '../servicios/carrito.service';
import { DireccionService } from '../servicios/direcciones.service';
import { MenuService } from '../servicios/menu.service';

@Component({
  selector: 'app-pago1',
  templateUrl: './pago1.page.html',
  styleUrls: ['./pago1.page.scss'],
})
export class Pago1Page implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;


  public infoCompra: any
  public usuario: any
  public sucursal: any
  public tarjetas: any = []
  public direcciones: any = []

  public tipoOrden = "PICKUP"
  public direccionSelected: any

  public nombreTarjeta = ""

  public conCuantoEfectivo = 0

  public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#4c0607',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#31325f'
        }
      }
    }
  };

  stripeTest: FormGroup;

  public elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };


  constructor(
    public alertController: AlertController,
    public router: Router,
    private compraService: ComprasService,
    private sesionService: SesionService,
    private appService: AppService,
    private clikTools: ClikTools,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private servicioStripe: ServicioStripe,
    private apiclient: ApiclientService,
    private clikFechas: ClikFechas,
    private carritoService: CarritoService,
    private direccionService: DireccionService,
    private menuService: MenuService
  ) {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.infoCompra = this.compraService.getCompraObject()
    this.usuario = this.sesionService.getObjectUsuario()

    this.cargarDirecciones()
    this.sucursal = this.menuService.getSucursalItemObj()
    console.log("SUCURSAL", this.sucursal);
    
  }

  async wallet() {
    if (this.tipoOrden == undefined || this.tipoOrden == null) {
      this.clikTools.warningToast("Must choose an order's type")
    } else {
      this.asingarVenta("MONEDERO")
    }
  }

  public async tarjetaPay(tarjeta) {
    if (this.tipoOrden == undefined || this.tipoOrden == null) {
      this.clikTools.warningToast("Must choose an order's type")
    } else {

      const lasts = tarjeta.numero.substr(tarjeta.numero.length - 4)
      const nombre = tarjeta.nombre
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "Pago con tarjeta " + lasts + " (" + nombre + ")",
        message: "A pagar $" + this.infoCompra.total.toFixed(2),
        translucent: true,
        inputs: [
          {
            name: 'cvv',
            type: 'password',
            placeholder: 'Introduce el CVV',
            attributes: {
              maxlength: 4,
              required: true
            }
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'Pagar',
            handler: () => {
              this.router.navigateByUrl("/pedidoexitoso");
            }
          }
        ]
      });
      await alert.present();
    }
  }

  async efectivo() {
    if (this.tipoOrden == undefined || this.tipoOrden == null) {
      this.clikTools.warningToast("Must choose an order's type")
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Pago en efectivo',
        message: 'Inserta el monto',
        translucent: true,
        inputs: [
          {
            name: 'cantidad',
            type: 'number',
            placeholder: 'Ex: 300',
            attributes: {
              maxlength: 4,
              required: true
            }
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Confirmar',
            handler: (data) => {
              if (Number(data.cantidad) < Number(this.infoCompra.total.toFixed(2))) {
                this.clikTools.warningToast("Not enough cash")
              } else {
                this.conCuantoEfectivo = data.cantidad
                this.asingarVenta("EFECTIVO")
              }
            }
          }
        ]
      });
      await alert.present();
    }
  }

  /* STRIPE METHODS */
  async createToken() {
    if (this.tipoOrden == undefined || this.tipoOrden == null) {
      this.clikTools.warningToast("Must choose an order's type")
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "Pago con tarjeta ",
        message: "A pagar $" + this.infoCompra.total.toFixed(2),
        translucent: true,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary'
          }, {
            text: 'Pagar',
            handler: () => {
              this.pagarStrapi()
            }
          }
        ]
      });
      await alert.present();
    }
  }

  pagarStrapi() {
    const name = this.nombreTarjeta
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          const token = result.token.id
          this.apiclient.pagarStripe(this.infoCompra.total.toFixed(2), token)
            .toPromise().then((response: any) => {
              this.apiclient.actualizarDato("users", this.usuario.id, { pedido_pendiente: true }).subscribe((response: any) => {
                if (response.hasOwnProperty("id")) {
                  this.asingarVenta("TARJETA")
                }
              })
            })
            .catch((error: any) => {
              this.clikTools.warningToast("There was an error when paying order, try later")
            })
        } else if (result.error) {
          // Error creating the token
          this.clikTools.warningToast("There was an error when paying order, try later")
        }
      });
  }

  asingarVenta(tipoPago: string) {
    this.apiclient.actualizarDato("users", this.usuario.id, { pedido_pendiente: true }).subscribe((response: any) => {
      if (response.hasOwnProperty("id")) {

        let recoger = false
        if (this.tipoOrden == "PICKUP") {
          recoger = true
        }

        this.infoCompra["tipo_pago"] = tipoPago

        if (tipoPago == "EFECTIVO") {
          this.infoCompra["cantidad_efectivo"] = this.conCuantoEfectivo
        }

        let dataPedido = {
          fecha: this.clikFechas.hoy(),
          cliente: this.usuario.id,
          productos: this.infoCompra,
          total: this.infoCompra.total,
          subtotal: this.infoCompra.subtotal,
          ordena_y_recoje: recoger,
          tipo_pago: tipoPago,
          sucursal: this.sucursal.id
        }

        this.apiclient.crearDato("pedidos", dataPedido).subscribe(response => {
          if (response.hasOwnProperty("id")) {
            this.carritoService.limpiarCarrito()
            this.apiclient.obtenerDatoEspecifico("users", this.usuario.id).subscribe(response => {
              if (response.hasOwnProperty("id")) {
                this.sesionService.setUsuario(JSON.stringify(response))
                this.clikTools.acceptMessage("Payment succesful!", "In this screen you can check your order's status")
                this.router.navigateByUrl("/pedidoexitoso");
              }
            })
          }
        })
      }
    })
  }

  public async direccionChanged(){
    if(this.direcciones.length < 1){
      let alert = await this.alertController.create({
        header: "You don't have any address",
        message: "Do you want to add one now?",
        buttons: [
          {
            text: "Pick up order",
            handler: () => {
              this.tipoOrden = "PICKUP"
            }
          },
          {
            text: "Add Address",
            handler: () => {
              this.direccionService.setNuevaDireccion()
              this.router.navigateByUrl("adddireccion")
            }
          }
        ]
      })
      alert.present()
    }
  }

  public async cargarDirecciones(){
    this.direcciones = await this.appService.cargarDireccionesDeUsuario()
  }
}