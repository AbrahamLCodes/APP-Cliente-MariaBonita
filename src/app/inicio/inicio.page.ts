import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../servicios/app.service';
import { MenuService } from '../servicios/menu.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public sucursales: any = []

  constructor(
    public appService: AppService,
    public menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarSucursales()
  }

  private async cargarSucursales() {
    this.sucursales = await this.appService.cargarSucursales()
  }

  public goToHome(sucursal) {
    this.menuService.setSucursalItem(sucursal)
    this.router.navigateByUrl("home")
  }
}
