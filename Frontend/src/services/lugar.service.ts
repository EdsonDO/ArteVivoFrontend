import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lugar } from '../model/lugar.model';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
  private ApiUrl = 'http://127.0.0.1:8000/api/lugares/';

  constructor(private http: HttpClient) {}

  getLugares(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.ApiUrl);
  }
}
