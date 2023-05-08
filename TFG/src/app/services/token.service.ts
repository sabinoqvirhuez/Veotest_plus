import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  constructor(private servicio: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const tokenizeReq = req.clone({
      setHeaders: {
        token: `Bearer ${this.servicio.getToken()}`
      }
    })
    return next.handle(tokenizeReq);
  }
}

