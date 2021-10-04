import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CarritoService } from '../servicios/carrito.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit {
  sharerData = {
    title: 'La nueva central',
    text: 'Conoce nuestro Menú y Ordena en linea el platillo de tu preferencia.',
    url: 'https://nuevacentral-c6c44.web.app',
  };


  public carritoCount: Observable<number>

  constructor(
    public router: Router, 
    private _location: Location,
    private carritoService: CarritoService
  ) {
    this.carritoCount = carritoService.getCarritoCount()
  }

  ngOnInit() { 
    
  }


  backClicked() {
    this._location.back();
  }

}
