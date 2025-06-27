import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Evento } from '../model/evento.model';



@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private ApiUrl = 'http://127.0.0.1:8000/api/eventos/';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.ApiUrl);
  }

  getEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.ApiUrl}${id}/`);
  }
}
