import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ReservarComponent } from './reservar/reservar.component';
import { ReservasComponent } from './reservas/reservas.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';


const routes: Routes = [
  { path: '', component: InicioComponent }, 
  { path: 'inicio', component: InicioComponent },
  { path: 'reservar', component: ReservarComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'cuenta', component: CuentaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
