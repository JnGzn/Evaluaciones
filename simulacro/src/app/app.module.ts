import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ExamenComponent } from './components/examen/examen.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearPreguntasComponent } from './components/crear-preguntas/crear-preguntas.component';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ExamenComponent,
    HomeComponent,
    CrearPreguntasComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'jngzn.us.auth0.com',
      clientId: 'k3eD5m6Y2oWyJftzQcosJWwmWwwOhcCh'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
