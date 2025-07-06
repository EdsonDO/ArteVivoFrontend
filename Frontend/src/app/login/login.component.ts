import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  identifier: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    console.log('Loggeado...', this.identifier, this.password);

    // Redirige siempre al inicio (ruta por defecto)
    this.router.navigate(['/inicio']);
  }
}
