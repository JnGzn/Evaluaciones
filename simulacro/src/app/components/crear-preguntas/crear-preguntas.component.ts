import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamenService } from '../../services/examen.service';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css']
})
export class CrearPreguntasComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private examenService: ExamenService) {
    this.crearFormulario()
  }

  ngOnInit(): void {
  }

  guardar(): void{
    if (this.form.invalid){
      return;
    }

    console.log(this.form.value);
    // tslint:disable-next-line: deprecation
    this.examenService.guardaPregunta(this.form.value).subscribe(resp => {
      console.log(resp);
    });// /7.subscribe(res => console.log());

  }
  private crearFormulario(): void{
    this.form = this.fb.group({
      enunciado: ['', Validators.required],
      opciones: this.fb.array([

      ])
    })
  }

  get opciones(): FormArray{
    return this.form.get('opciones') as FormArray;
  }

  agregarOpciones(): void{
    this.opciones.push(this.fb.control(''))
  }

  eliminarOpciones(idx: number): void{
    this.opciones.removeAt(idx);
  }

}
