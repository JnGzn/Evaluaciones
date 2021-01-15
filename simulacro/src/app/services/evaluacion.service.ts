import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Examen } from '../interfaces/pregunta';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  private urlBase = 'https://simulacros-5658f-default-rtdb.firebaseio.com';
  examenes$: Observable<Examen[]>;
  constructor(db: AngularFireDatabase, private http: HttpClient) {
    this.examenes$ = db.list<Examen>('evaluaciones').valueChanges();
    // this.examenes$.subscribe(d => console.log(d))
  }

  obtenerExamenes(): Observable<Examen[]>{
    return this.http.get(`${this.urlBase}/evaluaciones.json`).pipe(
      map(res => this.crearArreglo(res))
    );
  }



  obtenerExamen(id: string): Observable<Examen>{
    return this.http.get<Examen>(`${this.urlBase}/evaluaciones/${id}.json`);
  }

  crearExamen(componente: Examen): Observable<Examen>{
    return this.http.post<Examen>(`${this.urlBase}/evaluaciones.json`, componente).pipe(
      tap((res: any) => {
        componente.id = res.name;
        this.actualizarExamen(componente).subscribe();
      })
    );
  }

  actualizarExamen(pregunta: Examen): Observable<Examen>{
    const preguntaTemp = { ...pregunta };
    // delete preguntaTemp.id;
    return this.http.put<Examen>(`${this.urlBase}/evaluaciones/${pregunta.id}.json`, preguntaTemp);
  }

  private crearArreglo(preguntaObj: object): Examen[]{
    const preguntas: Examen[] = [];
    if (!preguntaObj) {
      return preguntas;
    }

    Object.keys(preguntaObj).forEach(key => {
      const pregunta: Examen = preguntaObj[key];
      pregunta.id = key;
      preguntas.push(pregunta);
    });

    return preguntas;
  }
}
