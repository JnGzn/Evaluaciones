import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from 'src/app/interfaces/pregunta';
import { ExamenService } from '../../services/examen.service';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.css']
})
export class ComponenteComponent implements OnInit {


  preguntas: Observable<Pregunta[]>;
  constructor(private examenService: ExamenService) { }

  ngOnInit(): void {
    this.preguntas = this.examenService.obtenerPreguntas();
  }

  eliminarPregunta(id: string): void{
    this.examenService.eliminarPregunta(id);
  }
}
