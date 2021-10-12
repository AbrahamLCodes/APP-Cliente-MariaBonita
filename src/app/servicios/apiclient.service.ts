import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ApiclientService {

  protected readonly strapiurl = 'https://strapi.apphotelesmariabonita.com'

  constructor(
    protected req: HttpClient,
    private http: HttpClient,
    public alert: AlertController
  ) {
  }

  public obtenerDatos(tipo: string) {
    return this.http.get(`${this.strapiurl}/${tipo}`)
  }

  public obtenerDatoEspecifico(tipo: string, id: number) {
    return this.http.get(`${this.strapiurl}/${tipo}/${id}`)
  }

  public crearDato(tipo: string, body: any) {
    return this.http.post(`${this.strapiurl}/${tipo}`, body)
  }

  public actualizarDato(tipo: string, id: number, body: any) {
    return this.http.put(`${this.strapiurl}/${tipo}/${id}`, body)
  }

  public eliminarDato(tipo: string, id: number) {
    return this.http.delete(`${this.strapiurl}/${tipo}/${id}`)
  }

  public crearUsuario(body: any) {
    return this.http.post(`${this.strapiurl}/auth/local/register`, body)
  }

  public seleccionarDireccion(body: any) {
    return this.http.put(`${this.strapiurl}/seleccionarDireccion`, body)
  }

  public obtenerDatosEspecificosDeTipo(tipo: string, where: string, valor: string) {
    const body = {
      tipo: tipo,
      where: where,
      valor: valor
    }
    return this.http.post(`${this.strapiurl}/consultaCustom`, body)
  }

  public pagarStripe(cantidad, token) {
    const body = { cantidad: cantidad, token: token }
    return this.http.post(`${this.strapiurl}/pagarStripe`, body)
  }

  public seleccionarTarjeta(body: any) {
    return this.http.put(`${this.strapiurl}/seleccionarTarjeta`, body)
  }

  public tarjetasPorUsuario(usuarioId: number) {
    return this.http.post(`${this.strapiurl}/tarjetasPorUsuario`, { usuarioId: usuarioId })
  }

  public monederoDeCliente(usuarioId: number) {
    return this.http.post(`${this.strapiurl}/monederoDeCliente`, { usuarioId: usuarioId })
  }

  public getImagenURL(url: string) {
    return `${this.strapiurl + url}`;
  }

  public getBackgroundImagenURL(url: string) {
    return `background-image: url(${this.strapiurl + url});`;
  }

  getDireccion(lat: number, long: number) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyC3QCWQ4xySdmPUdXOwUJRjPScjXT6SBTU`);
  }

  public login(email: string, password: string) {

    return this.http.post(
      `${this.strapiurl}/auth/local`,
      { identifier: email, password: password })
      .pipe(catchError(this.loginerror))
  }

  public loginProvider(provider: string) {
   // window.location.href = `${this.strapiurl}/connect/${provider}`;
    return this.http.get(
      `${this.strapiurl}/connect/${provider}`)
  }

  public obtenerUsuarioSocial(tokens: any, provider){
    let params = new URLSearchParams();
    for(let key in tokens){
      params.set(key, tokens[key])
    }
    return this.http.get(`${this.strapiurl}/auth/${provider}/callback/?${params}`)
  }

  async loginerror(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      let alerter = new AlertController()
      const m = await alerter.create({
        header: "An error has ocurred",
        message: "Try later",
        buttons: [
          {
            text: "OK"
          }
        ]
      })
      m.present()
    } else {
      let alerter = new AlertController()
      const m = await alerter.create({
        header: "Can't login",
        message: "Check your credentials",
        buttons: [
          {
            text: "OK"
          }
        ]
      })
      m.present()
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}