// Para que se pueda construir sobre el servicio
import { Injectable } from "@angular/core";
// Permite traer datos del API
import { HttpClient } from "@angular/common/http";
// Permite la redirección y mandarte a la página que deseas | permite saber a donde vas a ir
import { Router, ActivatedRoute } from "@angular/router";
// Para crear una cookie, más que para eso, para definir que la cookie esté caliente o sea que se pueda usar mientras aunque se realicen cambios
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // El token será una cookie y puede ser un string o nulo.
  private token = new BehaviorSubject<string | null>(null);

  // Creamos la URL de la API, aca se crea NO TE OLVIDES EDSON
  private apiUrl = 'http://127.0.0.1:8000/api';

  // Creamos el constructor
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  // Generamos el método login | Automatización
  login(username: string, password: string) {
    const headers = { 'x-api-key': '0PusHseewlbCvHZRtzIueT1DDpI0fw9oUxkOAf9db1ToVme88sSkGC50HEpzHCMEJ0ICuB5FLwQoY91tH3Jg3itcRbhwyzvm17s7E3uPYY8PVtaLPgXfTiTmZ4y55h2x' }
    this.http.post<{ token: string }>(this.apiUrl + '/token-auth/', { username, password }, { headers }).subscribe(respuesta => {
      this.token.next(respuesta.token);
      localStorage.setItem('token', respuesta.token);
      // Saca todos los mapeados de la URL. Le saca una foto  (snapshot) y de esa foto va a sacar todos los parámetros
      const urlRetorno = this.route.snapshot.queryParamMap.get('returnUrl') || '/' // En caso no encuentre la ruta, lo deja como ruta vacía.
      this.router.navigateByUrl(urlRetorno);
    }, error => {
      console.error('Error en el login', error)
    });
    // Se pone entre llaves para que se transforme en JSON
  }

  areYouLogged() {
    // Da como resultado, verdadero o falso. Si el token tiene valor y este es diferente de nulo, significa que está logueado. En caso no tenga valor, significa que no está logueado.
    return this.token.value !== null;
  }

  logOff() {
    this.token.next(null);                      // Actualiza el observable
    localStorage.removeItem('token');           // Limpia el almacenamiento
    this.router.navigate(['/login']);
  }
}
