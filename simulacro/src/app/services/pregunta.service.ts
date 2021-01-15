import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pregunta, Componente } from '../interfaces/pregunta';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private urlBase = 'https://simulacros-5658f-default-rtdb.firebaseio.com';
  // private urlBase = 'https://firestore.googleapis.com/v1beta1/{parent=projects/*/databases/*}';
  items$: Observable<AngularFireAction<any>[]>;
  size$ = new Subject<string>();
  items2$: Observable<any>;
  private preguntasCollection: AngularFirestoreCollection<Pregunta>;

  constructor(private http: HttpClient, private firestore: AngularFirestore, private db: AngularFireDatabase) {
    // this.preguntasCollection = this.firestore.collection<Pregunta>('preguntas');
    // const size$ = new Subject<string>();
    this.items2$ = this.size$.pipe(
      switchMap(param =>
        this.db.list('/preguntas', ref => ref.orderByChild('idComponente').equalTo(param)).valueChanges()
      )
    );
   }

  obtenerPreguntas(): Observable<Pregunta[]>{
    return this.http.get(`${this.urlBase}/preguntas.json`).pipe(
      map(res => this.crearArreglo(res))
    );
  }

  obtenerPregunta(id: string): Observable<Pregunta>{
    return this.http.get<Pregunta>(`${this.urlBase}/preguntas/${id}.json`);
  }

  actualizarPregunta(pregunta: Pregunta): Observable<Pregunta>{
    const preguntaTemp = { ...pregunta };
    // delete preguntaTemp.id;
    return this.http.put<Pregunta>(`${this.urlBase}/preguntas/${pregunta.id}.json`, preguntaTemp);
  }

  eliminarPregunta(id: string): Observable<any>{
    return this.http.delete(`${this.urlBase}/preguntas/${id}.json`);
  }

  guardaPregunta(pregunta: Pregunta): Observable<any>{
    return  this.http.post(`${this.urlBase}/preguntas.json`, pregunta);
  }

  obtenerPreguntasComponente(idcomponente: string): Observable<any>{
    console.log(idcomponente);
    this.size$.next(idcomponente);
    return this.items2$;
  }



  crearPregunta(pregunta: Pregunta): Observable<any>{
    // this.preguntasCollection.add(pregunta);
    return this.http.post(`${this.urlBase}/preguntas.json`, pregunta).pipe(
      tap((resp: any) => {
        pregunta.id = resp.name;
        this.actualizarPregunta(pregunta).subscribe();
      })
    );
  }

  private crearArreglo(preguntaObj: object): Pregunta[]{
    const preguntas: Pregunta[] = [];
    if (!preguntaObj) {
      return preguntas;
    }

    Object.keys(preguntaObj).forEach(key => {
      const pregunta: Pregunta = preguntaObj[key];
      pregunta.id = key;
      preguntas.push(pregunta);
    });

    return preguntas;
  }
}
