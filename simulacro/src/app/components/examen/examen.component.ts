import { Component, OnInit } from '@angular/core';
import { Pregunta } from '../../interfaces/pregunta';
import { Observable } from 'rxjs';
import { ExamenService } from '../../services/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  preguntas: Observable<Pregunta[]>;
  constructor(private examenService: ExamenService) { }

  ngOnInit(): void {
    this.preguntas = this.examenService.obtenerPreguntas();
  }

}
