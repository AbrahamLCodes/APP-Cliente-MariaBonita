import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClikTools } from '../cliktools/cliktools';
import { SesionService } from '../servicios/sesion.service';

@Injectable({
    providedIn: 'root'
})
export class SessionGuard implements CanActivate {

    constructor(
        private router: Router,
        private sesionService: SesionService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.sesionService.getToken()) {
            this.router.navigateByUrl('/login');
            return false
        } else {
            return true
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class NoSessionGuard implements CanActivate {

    constructor(
        private router: Router,
        private sesionService: SesionService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.sesionService.getToken()) {
            return true
        } else {
            this.router.navigateByUrl('home')
            return false
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class NoOrdenPendienteGuard implements CanActivate {

    constructor(
        private router: Router,
        private sesionService: SesionService,
        private clikTools: ClikTools
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const usuario = this.sesionService.getObjectUsuario()
        let puede = false
        if(usuario.pedido_pendiente != true){
            puede = true
        }

        if(!puede){
            this.clikTools.warningToast("To access this screen you must have a pending order")
            this.router.navigateByUrl("inicio")
        }
        return puede
    }
}

@Injectable({
    providedIn: 'root'
})
export class OrdenPendienteGuard implements CanActivate {

    constructor(
        private router: Router,
        private sesionService: SesionService,
        private clikTools: ClikTools
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const usuario = this.sesionService.getObjectUsuario()
        let puede = false
        if(usuario.pedido_pendiente == true){
            puede = true
        }

        if(!puede){
            this.clikTools.warningToast("To access this screen you must have a pending order")
            this.router.navigateByUrl("inicio")
        }
        return puede
    }
}
