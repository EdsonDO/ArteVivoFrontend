import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://127.0.0.1:8000/api/categorias/';

  constructor(private http: HttpClient) { }
   
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}${id}/`);
  }


  createCategoria(categoriaData: FormData): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoriaData);
  }


  updateCategoria(id: number, categoriaData: FormData): Observable<Categoria> {
    return this.http.patch<Categoria>(`${this.apiUrl}${id}/`, categoriaData);
  }

  
  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}