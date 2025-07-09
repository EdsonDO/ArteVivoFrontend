
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Para las animaciones
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // <-- ¡MUY IMPORTANTE!
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReservarComponent } from './reservar/reservar.component';
import { ReservasComponent } from './reservas/reservas.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { TokenInterceptor } from '../services/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ReservarComponent,
    ReservasComponent,
    CuentaComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
   { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }