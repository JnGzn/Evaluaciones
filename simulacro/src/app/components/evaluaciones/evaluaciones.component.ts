import { Component, OnInit } from '@angular/core';
import { Componente, Examen } from '../../interfaces/pregunta';
import { EvaluacionService } from '../../services/evaluacion.service';

@Component({
  selector: 'app-crear-evaluacion',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css']
})
export class CrearEvaluacionComponent implements OnInit {

  evaluaciones: Examen[];
  constructor(private evaluacionService: EvaluacionService) { }

  ngOnInit(): void {
    this.evaluacionService.obtenerExamenes().subscribe(examen => this.evaluaciones = examen);
  }

}
