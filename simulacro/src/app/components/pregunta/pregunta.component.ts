import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from '../../services/examen.service';
import { Pregunta } from '../../interfaces/pregunta';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class CrearPreguntasComponent implements OnInit {
  pregunta: Pregunta = {enunciado : '', id: '', opciones: []};
  form: FormGroup;
  constructor(private fb: FormBuilder, private examenService: ExamenService, private activatedRote: ActivatedRoute) {

    const id = this.activatedRote.snapshot.paramMap.get('id');
    this.crearFormulario();
    if (id !== 'nuevo'){

      this.examenService.obtenerPregunta(id).subscribe(pregunta => {
        if (pregunta){
          this.pregunta =  pregunta;
        }
        this.crearFormulario();
      });
    }
  }

  ngOnInit(): void {
  }

  guardar(): void{
    if (this.form.invalid){
      return;
    }
    let peticion: Observable<Pregunta>;
    if (this.pregunta.id){
      peticion = this.examenService.actualizarPregunta(this.pregunta);
    }else{
      peticion = this.examenService.crearPregunta(this.form.value);
    }
    peticion.subscribe();

  }
  private crearFormulario(): void{
    this.form = this.fb.group({
      enunciado: [this.pregunta.enunciado, Validators.required],
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
