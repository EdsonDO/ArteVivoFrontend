import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asiento } from '@models/asiento.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // Obtiene los asientos disponibles para un LUGAR específico
  getAsientosPorLugar(lugarId: number): Observable<Asiento[]> {

    return this.http.get<Asiento[]>(`${this.apiUrl}/asientos/?lugar=${lugarId}&disponible=true`);
  }

  // Realiza la reserva final
  crearReserva(datosReserva: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/entradas/`, datosReserva);
  }
}