import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExamenComponent } from './components/examen/examen.component';
import { CrearPreguntasComponent } from './components/pregunta/pregunta.component';
import { GuardGuard } from './services/guard.guard';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { ComponenteComponent } from './components/componente/componente.component';
import { Pregunta } from './interfaces/pregunta';
import { CrearEvaluacionComponent } from './components/evaluaciones/evaluaciones.component';
import { ComponentesComponent } from './components/componentes/componentes.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'examen', component: ExamenComponent, canActivate: [GuardGuard ]},
  {path: 'evaulacion/:id', component: EvaluacionComponent, canActivate: [GuardGuard ]},
  {path: 'pregunta/:id', component: CrearPreguntasComponent, canActivate: [GuardGuard ]},
  {path: 'componente/:id', component: ComponenteComponent, canActivate: [GuardGuard ]},
  {path: 'evaluacion/:id', component: EvaluacionComponent, canActivate: [GuardGuard ]},
  {path: 'crearModulo', component: CrearEvaluacionComponent, canActivate: [GuardGuard ]},
  {path: 'componentes', component: ComponentesComponent, canActivate: [GuardGuard ]},
  {path: 'crearPregunta', component: CrearPreguntasComponent},

  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
