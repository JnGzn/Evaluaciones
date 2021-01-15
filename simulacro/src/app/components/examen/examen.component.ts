import { Component, OnInit } from '@angular/core';
import { Pregunta, Respuesta } from '../../interfaces/pregunta';
import { Observable } from 'rxjs';
import { ExamenService } from '../../services/pregunta.service';
import { chunk } from 'lodash';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  preguntas$: Observable<Pregunta[]>;
  preguntaInicio = 1;
  preguntas: Pregunta[][];
  page = 1;
  respuestas: Respuesta[];

  constructor(private examenService: ExamenService) { }

  ngOnInit(): void {
    this.preguntas$ = this.examenService.obtenerPreguntas();
    this.preguntas$.subscribe(preguntas => {
      if(this.respuestas){
        return;
      }
      this.respuestas = [];
      this.preguntas = chunk(preguntas, 2);
      preguntas.forEach(pregunta => {

        this.respuestas.push({
          id: pregunta.id,
          enunciado: pregunta.enunciado
        });
      });
    });
  }

  actualizarRespuesta(idPregunta: string, respuesta: string): void{

    const idx = this.buscarIndicePregunta(idPregunta);
    console.log(this.respuestas[idx]);
    this.respuestas[idx].respuesta = respuesta;
    console.log(this.respuestas[idx]);

    // console.log(_.chunck(this.respuestas, 2))
  }

  buscarIndicePregunta(id): number{
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.respuestas.length; i++) {
      if (this.respuestas[i].id === id){
        return i;
      }
    }
  }

  llevarAPregunta(idx: number): void{
    let pageIdx = (idx + 1) / 2;


    // if (pageIdx <= 1){
    //   pageIdx = 0;
    // }
    pageIdx = Math.round(pageIdx);
    console.log(pageIdx);

    this.to(pageIdx);
    // this.page = Number((idx / 2).toFixed(0));
  }

  to(index: number) {
    if ( index >= 1 && index <= this.preguntas.length ) {
      this.preguntaInicio = (index * 2);
      if(index <= 2){
        this.preguntaInicio -= 1;
      }
      this.page = index;
    }
  }
}
