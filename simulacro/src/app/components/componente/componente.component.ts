import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from 'src/app/interfaces/pregunta';
import { ExamenService } from '../../services/pregunta.service';
import { ActivatedRoute } from '@angular/router';
import { Componente } from '../../interfaces/pregunta';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.css']
})
export class ComponenteComponent implements OnInit {

  componente: Componente = {nombre: '', id: ''};
  preguntas: Observable<Pregunta[]>;
  form: FormGroup;

  constructor(private examenService: ExamenService,
              private activatedRote: ActivatedRoute,
              private fb: FormBuilder) {
    const id = this.activatedRote.snapshot.paramMap.get('id');
    this.crearFormulario();
    if (id !== 'nuevo'){

      this.examenService.obtenerComponente(id).subscribe(componente => {
        this.componente = componente;
        this.componente.id = id;
        console.log(componente);
        this.preguntas = this.examenService.obtenerPreguntasComponente(id);
        // preguntas = this.preguntas.subscribe()
        this.crearFormulario();
      });
    }

  }

  ngOnInit(): void {

  }

  eliminarPregunta(id: string): void{
    this.examenService.eliminarPregunta(id);
  }

  guardar(): void{
    if (this.form.invalid){
      return;
    }


    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<Componente>;
    if (this.componente.id){
      peticion = this.examenService.crearComponente(this.componente);
    }else{
      const componenteTemp = {...this.form.value };
      // componenteTemp.respuesta = this.componente;
      console.log(componenteTemp);

      peticion = this.examenService.crearComponente(componenteTemp);
    }
    peticion.subscribe(componente => {
      console.log(componente);

      Swal.fire({
        title: componente.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
      this.componente = componente;

    },
    err => {
      Swal.fire({
        title: 'Se ha producion un error',
        text: err.error.error.message,
        icon: 'error'
      });
    });
  }

  private crearFormulario(): void{
    this.form = this.fb.group({
      nombreComponente: ['', Validators.required],
      cantidadPreguntas: ['', Validators.required],
      // respuesta: [this.respuesta, Validators.required],
    });
  }
}
