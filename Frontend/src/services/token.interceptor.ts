import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
 //Cambiar a comills inversas (Primera Corrección)
    // Nota para mi mismo: NO PONGAS TOKEN SI ES URL DE LOGIN
    // Nota para mi mismo: SI PONES TOKEN, PON TAMBIEN X-API-KEY
    if (token && !req.url.includes('/api/login/')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
          'X-API-KEY' : '0PusHseewlbCvHZRtzIueT1DDpI0fw9oUxkOAf9db1ToVme88sSkGC50HEpzHCMEJ0ICuB5FLwQoY91tH3Jg3itcRbhwyzvm17s7E3uPYY8PVtaLPgXfTiTmZ4y55h2x'
        }
      });
    }

    if (req.url.includes('/api/login/')) {
      req = req.clone({
        setHeaders: {
          'X-API-KEY' : '0PusHseewlbCvHZRtzIueT1DDpI0fw9oUxkOAf9db1ToVme88sSkGC50HEpzHCMEJ0ICuB5FLwQoY91tH3Jg3itcRbhwyzvm17s7E3uPYY8PVtaLPgXfTiTmZ4y55h2x'
        }
      });
    }

    return next.handle(req);
  }
}
