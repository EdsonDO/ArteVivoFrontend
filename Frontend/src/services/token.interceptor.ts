// Se ha simplificado para eliminar la X-API-KEY que ya no usamos.
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    // Si hay un token, lo añadimos a la cabecera de todas las peticiones,
    // excepto a la de login, que es la que nos da el token.
    if (token && !req.url.includes('/api/login/')) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}