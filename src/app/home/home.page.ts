import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { ApiclientService } from '../servicios/apiclient.service';
import { AppService } from '../servicios/app.service';
import { MenuService } from '../servicios/menu.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public busquedaProductos = ""

  public productos: any = []
  public productosRecomendados: any = []
  public productosPromos: any = []
  public productosFiltered: any = []

  public sucursales: any = []
  public categorias: any = []
  public extras: any = []

  public filtro = ""

  public slideOpts = {
    initialSlide: 0,
    speed: 1000,
    spaceBetween: 15,
    slidesPerView: 'auto',
    autoplay: true,
  };

  public sucursalItem: any

  constructor(
    public alertController: AlertController,
    private menuService: MenuService,
    private router: Router,
    private appService: AppService
  ) { }

  public ngOnInit() {

  }

  public ionViewDidEnter() {
    this.getSucursalItem()
    this.cargarCategorias()
    this.cargarExtras()
  }

  getSucursalItem() {
    this.sucursalItem = this.menuService.getSucursalItemObj()
    if (this.sucursalItem !== undefined && this.sucursalItem !== null) {
      this.cargarProductos()
    } else {
      this.router.navigateByUrl("inicio")
    }
  }

  goToProducto(producto) {
    this.menuService.setProductoItem(producto)
    this.router.navigateByUrl("/item")
  }

  async cargarProductos() {
    this.productos = await this.appService.cargarProductos()
    this.productosRecomendados = this.productos.filter(producto => producto.recomendado && this.productoTieneSucursal(producto) == true)
    this.productosPromos = this.productos.filter(producto => producto.promocion == true && this.productoTieneSucursal(producto) == true)
    this.productosFiltered = this.productos.filter(producto => this.productoTieneSucursal(producto) == true)
  }

  private productoTieneSucursal(producto): boolean {
    let tiene = false
    producto.sucursales.forEach(sucursal => {
      if (sucursal.id == this.sucursalItem.id) {
        tiene = true
      }
    })
    return tiene
  }

  async cargarSucursales() {
    this.sucursales = await this.appService.cargarSucursales()
  }

  async cargarCategorias() {
    this.categorias = await this.appService.cargarCategorias()
  }

  async cargarExtras() {
    this.extras = await this.appService.cargarExtras()
  }

  filtrarProducto() {
    this.productosFiltered = []
    this.productos.forEach(producto => {
      producto.categorias.forEach(categoria => {
        if (categoria.id == this.filtro) {
          this.productosFiltered.push(producto)
        }
      })
    })
  }

  public getImagen(producto) {
    let imagen;
    imagen = `https://strapi.togofreshco.com${this.productos.imagen.url}`;
    return imagen;
  }

  public getBackgroundImagen(producto) {
    let imagen;
    imagen = `background-image: url(https://strapi.togofreshco.com${producto.imagen.url});`;
    return imagen;
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  async sucursal() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Categorías',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Suc. Tecnológico',
          value: 'Categoria 1',
          handler: () => {
          },
          checked: true
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: () => {
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

  openUrl(siteWeb: string) {
    let link = siteWeb;
    let httpPrefix = "https://";
    if (!siteWeb.startsWith(httpPrefix)) {
      link = httpPrefix + siteWeb
    }
    window.location.href = link;
  }
}
