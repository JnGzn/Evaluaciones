import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Examen } from 'src/app/interfaces/pregunta';
import Swal from 'sweetalert2';
import { ExamenService } from '../../services/pregunta.service';
import { EvaluacionService } from '../../services/evaluacion.service';
import { Componente } from '../../interfaces/pregunta';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponenteService } from '../../services/componente.service';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css'],
})
export class EvaluacionComponent implements OnInit {
  evaluacion: Examen;
  componentes: Componente[];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _es: EvaluacionService,
    private activatedRote: ActivatedRoute,
    private componenteService: ComponenteService,
    private router: Router
  ) {
    const id = this.activatedRote.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this._es.obtenerExamen(id).subscribe((evaluacion) => {
        this.evaluacion = evaluacion;
        this.evaluacion.id = id;

        this.componenteService.obtenerComponentesExamen(id).subscribe((s) => {
          this.componentes = [];
          this.componentes = s;
        });
        this.componenteService.size$.next(id);
        this.crearFormulario();
      });
    } else {
      this.evaluacion = { id: 'nuevo', nombre: '', duracionMinutos: 0 };
      this.crearFormulario();
    }
  }

  eliminarComponente(id: string): void {
    this.componenteService.eliminarComponente(id);
  }

  ngOnInit(): void {}

  guardar(): void {
    if (this.form.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<Examen>;

    if (this.evaluacion.id !== 'nuevo') {
      this.form.value.id = this.evaluacion.id;

      peticion = this._es.actualizarExamen(this.form.value);
    } else {
      this.evaluacion = { ...this.form.value };
      delete this.evaluacion.id;
      this.form.value.componentes = []
      console.log(this.evaluacion);

      peticion = this._es.crearExamen(this.evaluacion);
    }
    peticion.subscribe(
      (componente) => {
        console.log(componente);
        this.evaluacion.id = componente['name'];
        console.log(this.evaluacion);
        Swal.fire({
          title: componente.nombre,
          text: 'Se actualizó correctamente',
          icon: 'success',
        });
        // this.componente = componente;
      },
      (err) => {
        Swal.fire({
          title: 'Se ha producion un error',
          text: err.error.error.message,
          icon: 'error',
        });
      }
    );
  }

  private crearFormulario(): void {
    this.form = this.fb.group({
      nombre: [this.evaluacion.nombre, Validators.required],
      duracionMinutos: [this.evaluacion.duracionMinutos, Validators.required],
    });
  }
}
