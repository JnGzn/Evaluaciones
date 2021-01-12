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
  // {path: 'evaulaciones', compon}ent: Evalu, canActivate: [GuardGuard ]},
  {path: 'pregunta/:id/:idComponente', component: CrearPreguntasComponent, canActivate: [GuardGuard ]},
  {path: 'componente/:id/:idEvaluacion', component: ComponenteComponent},
  {path: 'evaluacion/:id', component: EvaluacionComponent},
  {path: 'evaluaciones', component: CrearEvaluacionComponent, canActivate: [GuardGuard ]},
  {path: 'componentes', component: ComponentesComponent, canActivate: [GuardGuard ]},
  {path: 'crearPregunta', component: CrearPreguntasComponent},

  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
