import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/interfaces/pregunta';
import { ExamenService } from '../../services/pregunta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Componente, Examen } from '../../interfaces/pregunta';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComponenteService } from '../../services/componente.service';
import { EvaluacionService } from '../../services/evaluacion.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.css'],
})
export class ComponenteComponent implements OnInit {
  componente: Componente;
  preguntas: Pregunta[];
  form: FormGroup;
  evaluacion: Examen;

  constructor(
    private preguntaService: ExamenService,
    private activatedRote: ActivatedRoute,
    private fb: FormBuilder,
    private componenteService: ComponenteService,
    private evaluacionService: EvaluacionService,
    private router: Router
  ) {
    const id = this.activatedRote.snapshot.paramMap.get('id');
    const idEvaluacion = this.activatedRote.snapshot.paramMap.get(
      'idEvaluacion'
    );
    this.evaluacionService
      .obtenerExamen(idEvaluacion)
      .subscribe((evaluacion) => {
        if (!evaluacion) {
          this.router.navigate(['/home']);
        }

        this.evaluacion = evaluacion;
        if (id !== 'nuevo') {
          this.componente = { nombre: '', id: '' };
          this.crearFormulario();
          this.componenteService
            .obtenerComponente(id)
            .subscribe((componente) => {
              if (!componente) {
                this.router.navigate(['/home']);
              }
              this.componente = componente;

              this.componente.idExamen = idEvaluacion;
              console.log(idEvaluacion);

              this.componente.id = id;
              this.preguntaService.obtenerPreguntasComponente(id).subscribe(
                (s: any) => {
                  this.preguntas = s;
                  this.crearFormulario();
                },
                (err: any) => {
                  console.log(err);
                }
              );
              this.preguntaService.size$.next(id);
            });
        } else {
          this.componente = { nombre: '', id: 'nuevo' };
          this.componente.idExamen = idEvaluacion;

          this.crearFormulario();
        }
      });
  }

  ngOnInit(): void {}

  eliminarPregunta(id: string): void {
    this.preguntaService.eliminarPregunta(id);
  }

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

    let peticion: Observable<Componente>;

    if (this.componente.id !== 'nuevo') {
      this.form.value.id = this.componente.id;
      peticion = this.componenteService.actualizarComponente(this.form.value);
    } else {
      this.form.value.idExamen = this.componente.idExamen;
      this.componente = { ...this.form.value };
      console.log(this.evaluacion);
      peticion = this.componenteService.crearComponente(this.form.value);
    }
    peticion.subscribe(
      (componente) => {

        this.componente.id = componente['name'];
        if (!this.evaluacion.componentes) {
          this.evaluacion.componentes = [];
        }
        console.log(componente);

        if (true) {
          let idx = this.obtenerIdComponente(this.componente.id);
          if (!idx) {
            idx = 0;
            this.evaluacion.componentes[idx] = {id: '', nombre: ''}
          }
          this.evaluacion.componentes[idx].id = this.form.value.id;
          this.evaluacion.componentes[idx].nombre = this.form.value.nombre;
        }
        this.evaluacionService.actualizarExamen(this.evaluacion).subscribe(
          (ok) => {},
          (err) => {
            Swal.fire({
              title: 'Se ha producion un error',
              text: err.error.error.message,
              icon: 'error',
            });
          }
        );


        Swal.fire({
          title: componente.nombre,
          text: 'Se actualizó correctamente',
          icon: 'success',
        });
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
      nombre: [this.componente.nombre, Validators.required],
      cantPreguntas: [this.componente.cantPreguntas, Validators.required],
      // respuesta: [this.respuesta, Validators.required],
    });
  }

  private obtenerIdComponente(idComponente: string): number {
    let idx = 0;
    for (const componente of this.evaluacion.componentes) {
      if (componente.id === idComponente) {
        return idx;
      }
      idx++;
    }
    return null;
  }
}
