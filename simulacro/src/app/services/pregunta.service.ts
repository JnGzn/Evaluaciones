import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pregunta, Componente } from '../interfaces/pregunta';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private urlBase = 'https://simulacros-5658f-default-rtdb.firebaseio.com';
  private preguntasCollection: AngularFirestoreCollection<Pregunta>;
  constructor(private http: HttpClient, private firestore: AngularFirestore, private db: AngularFireDatabase) {
    this.preguntasCollection = this.firestore.collection<Pregunta>('preguntas');
   }

  obtenerPreguntas(): Observable<Pregunta[]>{
    return this.http.get(`${this.urlBase}/preguntas.json`).pipe(
      map(res => this.crearArreglo(res))
    );
  }

  obtenerPregunta(id: string): Observable<Pregunta>{
    return this.http.get<Pregunta>(`${this.urlBase}/preguntas/${id}.json`);
  }
  obtenerComponente(id: string): Observable<Componente>{

    return this.http.get<Componente>(`${this.urlBase}/componentes/${id}.json`)
    // .pipe(
    //   map((res: any) => {
    //     console.log(res);

    //     res.id = res.name;
    //     return res;
    //   })
    // );
  }


  actualizarPregunta(pregunta: Pregunta): Observable<Pregunta>{
    const preguntaTemp = { ...pregunta };
    delete preguntaTemp.id;
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

    return this.firestore.collection('preguntas', ref => {
                                      return ref.where('idComponente', '==', idcomponente );
                                     }).valueChanges(); //.where(, '==', idcomponente)).valueChanges();
    // return this.fb.list('items', ref => {
    //                                   return ref.where('idComponente', '==', idcomponente );
    //                                  }).valueChanges(); //.where(, '==', idcomponente)).valueChanges();
  }

  crearComponente(componente: Componente): Observable<any>{
    return this.http.post(`${this.urlBase}/componentes.json`, componente)
    // .pipe(
    //   map((res: any) => {
    //     componente.id = res.name;
    //     return componente;
    //   })
    // );
  }

  crearPregunta(pregunta: Pregunta): Observable<any>{
    this.preguntasCollection.add(pregunta);
    return this.http.post(`${this.urlBase}/preguntas.json`, pregunta);
    // .pipe(
    //   map( res => {
    //     heroe.id = res['name'];
    //     return heroe;
    //   })
    // );
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
