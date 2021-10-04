import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClikTools } from '../cliktools/cliktools';
import { ApiclientService } from '../servicios/apiclient.service';
import { AppService } from '../servicios/app.service';
import { CarritoService } from '../servicios/carrito.service';
import { MenuService } from '../servicios/menu.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  public producto: any
  public productos: any = []

  public productosEnTipo: any = []

  public tipos: any = []

  public opcionales = []

  public comentarios = ""

  public slideOpts = {
    initialSlide: 0,
    speed: 1000,
    spaceBetween: 15,
    slidesPerView: 1,
    autoplay: true,
  };

  constructor(
    private clikTools: ClikTools,
    private router: Router,
    private menuService: MenuService,
    public apiclient: ApiclientService,
    private appService: AppService,
    private carritoService: CarritoService
  ) { }

  ngOnInit() {
    this.producto = this.menuService.getProductoItemObj()
    this.tipos = this.producto.tipos
    this.cargarProductos()
  }

  public agregarAlCarrito() {
    const pedidoProducto = {
      producto: this.producto,
      opcionales: this.opcionales,
      subtotal: this.calcularSubTotal(),
      comentarios: this.comentarios
    }

    this.carritoService.agregarProducto(pedidoProducto)
    this.clikTools.customToast(this.producto.titulo + " added to Cart", "primary")
    this.router.navigateByUrl("/cesta")
  }

  public toggleOpcional(opcional) {
    if (this.opcionalExisteEnLista(opcional)) {
      const index = this.opcionalEnLista(opcional)
      this.opcionales.splice(index, 1)
    } else {
      this.opcionales.push({ opcional: opcional, cantidad: 1 })
    }
  }

  public removeOpcional(opcional) {
    if (this.opcionalExisteEnLista(opcional)) {
      const index = this.opcionalEnLista(opcional)
      if (this.opcionales[index].cantidad > 1) {
        this.opcionales[index].cantidad -= 1
      } else {
        this.opcionales.splice(index, 1)
      }
    }
  }

  public addOpcional(opcional) {
    let opcionalCount = this.htmlOpcionalCount(opcional)
    if (opcionalCount < opcional.opcion.max) {
      if (this.opcionalExisteEnLista(opcional)) {
        let indexLista = this.opcionalEnLista(opcional)
        this.opcionales[indexLista].cantidad += 1
      } else {
        this.opcionales.push({ opcional: opcional, cantidad: 1 })
      }
    } else {
      this.clikTools.warningToast("Optionals limit reached")
    }
  }

  public opcionalEnLista(opcional): number {
    let index = 0
    for (let i = 0; i < this.opcionales.length; i++) {
      if (this.opcionales[i].opcional.producto.id == opcional.producto.id) {
        index = i
        break
      }
    }
    return index
  }

  public opcionalExisteEnLista(newOpcional): boolean {
    let existe = false
    for (let i = 0; i < this.opcionales.length; i++) {
      if (this.opcionales[i].opcional.producto.id == newOpcional.producto.id) {
        existe = true
        break
      }
    }
    return existe
  }

  public calcularSubTotal(): number {

    const precioProducto = this.producto.precio
    let precioOpcionales = 0

    this.opcionales.forEach(opcional => {
      precioOpcionales += Number((Number(opcional.opcional.producto.precio) * Number(opcional.cantidad)).toFixed(2))
    })

    return precioProducto + precioOpcionales
  }

  public htmlOpcionalCount(p) {
    let count = 0
    if (this.opcionalExisteEnLista(p)) {
      const index = this.opcionalEnLista(p)
      count = this.opcionales[index].cantidad
    }
    return count
  }

  public opcionalCount(p): number {
    let count = 0
    this.opcionales.map(opcional => {
      if (p.producto.id == opcional.opcional.producto.id) {
        count += 1
      }
    })
    return count
  }

  public detectarProductosEnTipo() {
    this.productos.forEach(producto => {
      this.tipos.forEach(tipo => {
        tipo.opciones.forEach(opcion => {
          if (opcion.product == producto.id) {
            this.productosEnTipo.push({ producto: producto, opcion: opcion, tipo: tipo })
          }
        })
      })
    })
  }

  public async cargarProductos() {
    this.productos = await this.appService.cargarProductos()
    this.detectarProductosEnTipo()
  }
}
