import { Component, OnInit } from '@angular/core';
import { ApiclientService } from '../servicios/apiclient.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-metodopago',
  templateUrl: './metodopago.page.html',
  styleUrls: ['./metodopago.page.scss'],
})
export class MetodopagoPage implements OnInit {

  public usuario: any
  public tarjetas: any = []

  constructor(
    private apiclient: ApiclientService,
    private sesionService: SesionService
  ) { }

  ngOnInit() {
    this.usuario = this.sesionService.getObjectUsuario()  
    console.log(this.usuario);
    
  }

  ionViewDidEnter() {
    this.cargarTarjetas()
  }

  cargarTarjetas() {
    this.apiclient.tarjetasPorUsuario(this.usuario.id).subscribe((response: any) => {
      console.log(response);
      this.tarjetas = response
    })
  }

  public tarjetaFavorita(tarjeta): boolean {
    let favorita = false
    if (this.usuario.metodo_pago == "TARJETA" && tarjeta.favorita) {
      favorita = true
    }
    return favorita
  }

  public elegirMetodo(metodo: string) {
    this.apiclient.actualizarDato("users", this.usuario.id, { metodo_pago: metodo }).subscribe(response => {
      if (response.hasOwnProperty("id")) {
        this.apiclient.obtenerDatoEspecifico("users", this.usuario.id).subscribe(response => {
          this.sesionService.setUsuario(JSON.stringify(response))
          this.usuario = this.sesionService.getObjectUsuario()          
        })
      }
    })
  }

  public elegirTarjeta(tarjeta: string) {
    this.apiclient.seleccionarTarjeta(tarjeta).subscribe(response => {
      this.sesionService.setUsuario(JSON.stringify(response[0]))
      this.usuario = this.sesionService.getObjectUsuario()
      this.cargarTarjetas()    
    })
  }
}
