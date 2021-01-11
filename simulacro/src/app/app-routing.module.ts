import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExamenComponent } from './components/examen/examen.component';
import { CrearPreguntasComponent } from './components/crear-preguntas/crear-preguntas.component';
import { GuardGuard } from './services/guard.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'examen', component: ExamenComponent, canActivate: [GuardGuard ]},
  {path: 'crearPregunta', component: CrearPreguntasComponent},

  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
