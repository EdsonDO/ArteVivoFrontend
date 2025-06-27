import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asiento } from '../model/asiento.model';

@Injectable({
  providedIn: 'root'
})
export class AsientoService {
  private ApiUrl = 'http://127.0.0.1:8000/api/asientos/';

  constructor(private http: HttpClient) {}

  getAsientos(): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(this.ApiUrl);
  }
}
