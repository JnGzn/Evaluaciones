import { Component, OnInit } from '@angular/core';
import { Componente } from '../../interfaces/pregunta';

@Component({
  selector: 'app-crear-evaluacion',
  templateUrl: './crear-evaluacion.component.html',
  styleUrls: ['./crear-evaluacion.component.css']
})
export class CrearEvaluacionComponent implements OnInit {
  componentes: Componente[] = [{id:'21', nombre: 'Matematicas', duracionMinutos: 2, cantPreguntas: 2}];
  constructor() { }

  ngOnInit(): void {
  }

}
