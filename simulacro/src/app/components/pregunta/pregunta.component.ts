import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from '../../services/pregunta.service';
import { Observable } from 'rxjs';
import { Pregunta } from 'src/app/interfaces/pregunta';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class CrearPreguntasComponent implements OnInit {
  pregunta: Pregunta;
  idComponente: string;
  respuesta = '';
  form: FormGroup;
  constructor(private fb: FormBuilder, private examenService: ExamenService, private activatedRote: ActivatedRoute) {

    const id = this.activatedRote.snapshot.paramMap.get('id');
    this.idComponente = this.activatedRote.snapshot.paramMap.get('idComponente');

    if (id !== 'nuevo'){

      this.examenService.obtenerPregunta(id).subscribe(pregunta => {
        if (pregunta){
          console.log(pregunta);
          // this.pregunta.id = id;
          this.pregunta =  pregunta;
          this.pregunta.idComponente = this.idComponente;
        }
        this.crearFormulario();
      });
    }else {
      this.pregunta = {enunciado : '', id: 'nuevo', opciones: [], respuesta: ''};
      this.crearFormulario();
    }
  }

  ngOnInit(): void {
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

    let peticion: Observable<Pregunta>;
    if (this.pregunta.id !== 'nuevo'){
      peticion = this.examenService.actualizarPregunta(this.pregunta);
    }else{
      this.pregunta = {...this.form.value};
      this.pregunta.respuesta = this.respuesta;
      this.pregunta.idComponente = this.idComponente;
      // this.pregunta.id = new Date().getTime().toString();
      peticion = this.examenService.crearPregunta(this.pregunta);
    }
    peticion.subscribe(pregunta => {


      Swal.fire({
        title: pregunta.enunciado,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

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
      enunciado: [this.pregunta.enunciado, Validators.required],
      // respuesta: [this.respuesta, Validators.required],
      opciones: this.fb.array([
        this.pregunta.opciones
      ])
    });
  }

  get opciones(): FormArray{
    return this.form.get('opciones') as FormArray;
  }

  agregarOpciones(valor): void{

    this.opciones.push(this.fb.control(valor));
  }

  eliminarOpciones(idx: number): void{
    this.opciones.removeAt(idx);
  }

}
