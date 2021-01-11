import { Component, OnInit } from '@angular/core';
import { Componente } from '../../interfaces/pregunta';

@Component({
  selector: 'app-crear-evaluacion',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css']
})
export class CrearEvaluacionComponent implements OnInit {
  componentes: Componente[]// = [{id:'21', nombre: 'Matematicas', duracionMinutos: 2, cantPreguntas: 2}];
  constructor() { }

  ngOnInit(): void {
  }

}
