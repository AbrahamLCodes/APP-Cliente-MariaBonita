import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../servicios/app.service';
import { CarritoService } from '../servicios/carrito.service';
import { ComprasService } from '../servicios/compras.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.page.html',
  styleUrls: ['./cesta.page.scss'],
})
export class CestaPage implements OnInit {

  public slideOpts = {
    initialSlide: 0,
    speed: 1000,
    spaceBetween: 15,
    slidesPerView: 'auto',
    autoplay: true,
  };

  public carrito: any = []
  public carritoForm: FormGroup

  constructor(
    private appService: AppService,
    private carritoService: CarritoService,
    private compraService: ComprasService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.carritoForm = fb.group({
      nota: [""],
      propina: [0, Validators.required],
    })
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.cargarCarrito()
  }

  public goToPay() {

    const subtotal = this.calcularSubTotalItems()
    const propina = this.carritoForm.get("propina").value
    const total = this.calculartotal()
    this.compraService.setCompra(subtotal, propina, total)
    this.router.navigateByUrl("pago1")
  }

  public eliminarItem(index) {
    this.carritoService.eliminarProducto(index)
    this.cargarCarrito()
  }

  public calcularSubTotalItems(): number {
    let subtotal = 0
    if (this.carrito !== null && this.carrito !== undefined) {
      this.carrito.map(item => {
        subtotal += item.subtotal
      })
    }
    return subtotal
  }

  public calculartotal(): number {
    let total = 0
    const subtotal = this.calcularSubTotalItems()
    const propina = Number(this.carritoForm.get("propina").value) / 100
    const subtotalPropina = subtotal * propina
    total = subtotal + subtotalPropina
    return total
  }

  private cargarCarrito() {
    this.carrito = this.carritoService.getObjectCarrito()
    console.log(this.carrito);
  }
}
