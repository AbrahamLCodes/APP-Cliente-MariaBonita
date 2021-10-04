import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SesionService } from './sesion.service';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private sesionService: SesionService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.sesionService.getToken() !== null && !request.url.includes("maps.google") && !request.url.includes("maps.googleapis")) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.sesionService.getToken()}`
        }
      });
    } 
    return next.handle(request);
  }
}