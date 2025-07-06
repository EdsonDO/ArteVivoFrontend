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

  // 🟢 NUEVAS PROPIEDADES
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

        // 🟢 OCULTA EL CUADRO cuando navegas a inicio o login
        if (event.url.includes('inicio') || event.url.includes('login')) {
          this.mostrarCuadro = false;
          this.cuadroContenido = '';
        }
      }
    });
  }

  redireccionar(url: string) {
    // Si es inicio o login → navega normal, sin cuadro
    if (url === '/inicio' || url === '/login') {
      this.mostrarCuadro = false;
      this.cuadroContenido = '';
      this.router.navigate([url]);
      return;
    }

    // Si es reservar → activa formulario
    if (url === '/reservar') {
      this.cuadroContenido = 'formulario';
    } else if (url === '/reservas') {
      this.cuadroContenido = 'tabla';
    } else {
      this.cuadroContenido = '';
    }

    // Reinicia animación
    this.mostrarCuadro = false;
    setTimeout(() => {
      this.mostrarCuadro = true;
    }, 10);

    // Navega igual (si quieres que NO cambie ruta, comenta esto)
    this.router.navigate([url]);
  }

  esLoginoRegistro(): boolean {
    return this.router.url === '/login' || this.router.url === '/registro';
  }

  toggleMenu() {
    this.menuColapsado = !this.menuColapsado;
  }
}
