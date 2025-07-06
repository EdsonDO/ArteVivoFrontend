import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  username: string = '';
  password: string = '';
  router: any;

  register() {
    console.log('Registro: ', this.username, this.password);
    
    this.router.navigate(['/inicio']);
  
  }
}
 