
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../model/pago.model';
@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private ApiUrl = 'http://127.0.0.1:8000/api/pagos/';

  constructor(private http: HttpClient) {}

  getPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.ApiUrl);
  }

  createPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.ApiUrl, pago);
  }
}
