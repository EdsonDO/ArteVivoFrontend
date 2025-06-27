import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrada } from '../model/entrada.model';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {
  private ApiUrl = 'http://127.0.0.1:8000/api/entradas/';

  constructor(private http: HttpClient) {}

  getEntradas(): Observable<Entrada[]> {
    return this.http.get<Entrada[]>(this.ApiUrl);
  }

  createEntrada(entrada: Entrada): Observable<Entrada> {
    return this.http.post<Entrada>(this.ApiUrl, entrada);
  }
}
