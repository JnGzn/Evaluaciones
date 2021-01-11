import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pregunta } from '../interfaces/pregunta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private urlBase = 'https://simulacros-5658f-default-rtdb.firebaseio.com'
  constructor(private http: HttpClient) { }

  obtenerPreguntas(){
    return this.http.get(`${this.urlBase}/preguntas`)
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
}
