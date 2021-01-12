import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from 'src/app/interfaces/pregunta';
import { ExamenService } from '../../services/pregunta.service';
import { ActivatedRoute } from '@angular/router';
import { Componente } from '../../interfaces/pregunta';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComponenteService } from '../../services/componente.service';
@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.css']
})
export class ComponenteComponent implements OnInit {

  componente: Componente;
  preguntas: Pregunta[];
  form: FormGroup;

  constructor(private examenService: ExamenService,
              private activatedRote: ActivatedRoute,
              private fb: FormBuilder,
              private componenteService: ComponenteService
              ) {
    const id = this.activatedRote.snapshot.paramMap.get('id');
    const idEvaluacion = this.activatedRote.snapshot.paramMap.get('idEvaluacion');


    if (id !== 'nuevo'){
      this.componente = {nombre: '', id: ''};
      this.crearFormulario();
      this.componenteService.obtenerComponente(id).subscribe(componente => {
        this.componente = componente;
        this.componente.idExamen = idEvaluacion;

        this.componente.id = id;
        console.log(componente);
        this.examenService.obtenerPreguntasComponente(id).subscribe(s => {
          console.log(s)
          this.preguntas = s;
        })
        this.examenService.size$.next(id)


        // preguntas = this.preguntas.subscribe()
        this.crearFormulario();
      });
    }else {
      this.componente = {nombre: '', id: 'nuevo'};
      this.componente.idExamen = idEvaluacion;

      this.crearFormulario();
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

    if (this.componente.id !== 'nuevo'){
      this.form.value.id = this.componente.id;
      peticion = this.componenteService.actualizarComponente(this.form.value);
    }else{
      this.form.value.idExamen = this.componente.idExamen
      this.componente = {...this.form.value };
      // componenteTemp.respuesta = this.componente;
      console.log(this.componente);

      peticion = this.componenteService.crearComponente(this.form.value);
    }
    peticion.subscribe(componente => {
      console.log(componente);
      this.componente.id = componente['name'];
      console.log(this.componente)
      Swal.fire({
        title: componente.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
      // this.componente = componente;

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
      nombre: [this.componente.nombre, Validators.required],
      cantPreguntas: [this.componente.cantPreguntas, Validators.required],
      // respuesta: [this.respuesta, Validators.required],
    });
  }
}
