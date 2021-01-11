import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from '../interfaces/pregunta';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {
  private urlBase = 'https://simulacros-5658f-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  obtenerComponente(id: string): Observable<Componente>{
    return this.http.get<Componente>(`${this.urlBase}/componentes/${id}.json`);
  }

  crearComponente(componente: Componente): Observable<Componente>{
    return this.http.post<Componente>(`${this.urlBase}/componentes.json`, componente);
  }

}
