import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../model/rol.model';


@Injectable({
  providedIn: 'root'
})
export class RolService {
  private ApiUrl = 'http://127.0.0.1:8000/api/roles/';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.ApiUrl);
  }
}
