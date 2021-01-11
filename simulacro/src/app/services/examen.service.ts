import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pregunta } from '../interfaces/pregunta';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private urlBase = 'https://simulacros-5658f-default-rtdb.firebaseio.com'
  constructor(private http: HttpClient) { }

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
    delete preguntaTemp.id;
    return this.http.put<Pregunta>(`${this.urlBase}/preguntas/${pregunta.id}.json`, preguntaTemp);
  }

  guardaPregunta(pregunta: Pregunta): Observable<any>{
    return  this.http.post(`${this.urlBase}/preguntas.json`, pregunta);
  }

  crearPregunta(pregunta: Pregunta): Observable<any>{
    return this.http.post(`${this.urlBase}/preguntas.json`, pregunta)
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
