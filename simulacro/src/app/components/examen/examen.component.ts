import { Component, OnInit } from '@angular/core';
import { Pregunta } from '../../interfaces/pregunta';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  preguntas: Pregunta[] = [
  {
      id: 'hudij',
      enunciado: 'Cuanto es 2+2',
      opciones: ['2','3','4']
    }

  ]
  constructor() { }

  ngOnInit(): void {

  }

}
