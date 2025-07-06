import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../model/evento.model';
import { Categoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // Obtiene los eventos marcados como "destacados"
  getEventosDestacados(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/eventos/destacados/`);
  }

  // Obtiene TODAS las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias/`);
  }

  // Obtiene los eventos marcados como "promocionados"
  getEventosPromocionados(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/eventos/promocionados/`);
  }

  // Obtiene la lista completa de eventos (para una vista de "explorar", por ejemplo)
  getTodosLosEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/eventos/`);
  }

  // Obtiene los detalles de un solo evento
  getEventoDetalle(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/eventos/${id}/`);
  }
}