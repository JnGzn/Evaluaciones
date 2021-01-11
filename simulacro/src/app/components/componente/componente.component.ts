import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from 'src/app/interfaces/pregunta';
import { ExamenService } from '../../services/examen.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.css']
})
export class ComponenteComponent implements OnInit {


  preguntas: Observable<Pregunta[]>;
  constructor(private examenService: ExamenService, private activatedRote: ActivatedRoute) {
    const id = this.activatedRote.snapshot.paramMap.get('id');
    if (id !== 'nuevo'){

      this.examenService.obtenerPregunta(id);
    }
  }

  ngOnInit(): void {
    this.preguntas = this.examenService.obtenerPreguntas();
  }

  eliminarPregunta(id: string): void{
    this.examenService.eliminarPregunta(id);
  }
}
