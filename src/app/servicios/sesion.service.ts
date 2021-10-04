import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiclientService } from './apiclient.service';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private storage: Storage = localStorage;

  constructor(
    private router: Router,
    private apiclient: ApiclientService
  ) { }

  public removeSessionKey(key: string) {
    return this.storage.removeItem(key)
  }

  public removeLocalKey(key: string) {
    return this.storage.removeItem(key)
  }

  public setToken(token: string): void {
    this.storage.setItem('tokenFRESHCO', token);
  }

  public getToken(): string {
    return this.storage.getItem('tokenFRESHCO');
  }

  public removeToken() {
    this.storage.removeItem('tokenFRESHCO')
  }

  public setUsuario(usuario) {
    this.storage.setItem('usuarioFRESHCO', usuario);
  }

  public getObjectUsuario() {
    return JSON.parse(this.storage.getItem('usuarioFRESHCO'));
  }

  public reiniciarUsuario() {
    const currentUser = this.getObjectUsuario()
    this.apiclient.obtenerDatoEspecifico("users", currentUser.id).subscribe((response => {
      console.log(response);
    }))
  }

  public removeUsuarioLocal() {
    return this.storage.removeItem('usuarioFRESHCO')
  }

  public logout(){
    this.clear()
    this.router.navigateByUrl("/login").then(_ => {
      window.location.reload()
    })
  }

  public clear() {
    this.storage.clear();
    sessionStorage.clear()
  }
}