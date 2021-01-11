import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from '../../services/pregunta.service';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css']
})
export class ComponentesComponent implements OnInit {

  constructor(private activatedRote: ActivatedRoute, private examenService: ExamenService) {
    const id = this.activatedRote.snapshot.paramMap.get('id');
    if (id !== 'nuevo'){
      this.examenService.obtenerPregunta(id);
    }
   }

  ngOnInit(): void {
  }

}
