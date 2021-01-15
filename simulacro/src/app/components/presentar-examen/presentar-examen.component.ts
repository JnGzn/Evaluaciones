import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../services/pregunta.service';
import { EvaluacionService } from '../../services/evaluacion.service';
import { Examen } from '../../interfaces/pregunta';

@Component({
  selector: 'app-presentar-examen',
  templateUrl: './presentar-examen.component.html',
  styleUrls: ['./presentar-examen.component.css']
})
export class PresentarExamenComponent implements OnInit {

  examenesAux: Examen[];
  examenes: Examen[];
  texto: string = '';
  constructor(public examenService: EvaluacionService) { }

  ngOnInit(): void {
    // this.autocomplete("")
    this.examenService.examenes$.subscribe(examenes => {
      this.examenes = examenes;
      this.examenesAux = examenes;
    });
  }

  autocomplete(texto: string): void{
    console.log(this.texto)
    this.examenes = this.examenesAux.filter(examen => {
      return examen.nombre.toLowerCase().includes(texto.toLowerCase());
    })
  }



}
