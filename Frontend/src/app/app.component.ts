import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
   menuColapsado = false;

  constructor(private router: Router) {}

  redireccionar(url: string) {
    this.router.navigate([url]);
    console.log(url);
  }

  toggleMenu() {
    this.menuColapsado = !this.menuColapsado;
  }
  mostrarFormularioReservar = false;

}
