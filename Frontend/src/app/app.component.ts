import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  backgroundClass = '';
  title = 'Frontend';
  menuColapsado = false;

  mostrarCuadro = false;
  cuadroContenido = '';

  reservas = [
    { nombre: 'Juan Pérez', fecha: '2025-07-05', hora: '18:00' },
    { nombre: 'María López', fecha: '2025-07-06', hora: '19:30' },
    { nombre: 'Carlos Díaz', fecha: '2025-07-07', hora: '20:00' },
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('login')) {
          this.backgroundClass = 'login-bg';
        } else if (event.url.includes('inicio')) {
          this.backgroundClass = 'inicio-bg';
        } else {
          this.backgroundClass = '';
        }

        if (event.url.includes('inicio') || event.url.includes('login')) {
          this.mostrarCuadro = false;
          this.cuadroContenido = '';
        }
      }
    });
  }

  redireccionar(url: string) {
    if (url === '/inicio' || url === '/login') {
      this.mostrarCuadro = false;
      this.cuadroContenido = '';
      this.router.navigate([url]);
      return;
    }

    if (url === '/reservar') {
      this.cuadroContenido = 'formulario';
    } else if (url === '/reservas') {
      this.cuadroContenido = 'tabla';
    } else {
      this.cuadroContenido = '';
    }


    this.mostrarCuadro = false;
    setTimeout(() => {
      this.mostrarCuadro = true;
    }, 10);

    this.router.navigate([url]);
  }

  esLoginoRegistro(): boolean {
    return this.router.url === '/login' || this.router.url === '/registro';
  }

  toggleMenu() {
    this.menuColapsado = !this.menuColapsado;
  }
}
