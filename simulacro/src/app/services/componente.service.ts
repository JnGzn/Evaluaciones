import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { switchMap, map, refCount } from 'rxjs/operators';
import { Componente } from '../interfaces/pregunta';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {
  private urlBase = 'https://simulacros-5658f-default-rtdb.firebaseio.com';
  size$ = new Subject<string>();
  items2$: Observable<any>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.items2$ = this.size$.pipe(
      switchMap(param =>
        this.db.list('/componentes', ref =>
           ref.orderByChild('idExamen').equalTo(param)).valueChanges().pipe(
            map(res => {
              console.log(res);
              return res;
            })
          )
        )
      );
  }

  obtenerComponente(id: string): Observable<Componente>{
    return this.http.get<Componente>(`${this.urlBase}/componentes/${id}.json`);
  }

  crearComponente(componente: Componente): Observable<Componente>{
    return this.http.post<Componente>(`${this.urlBase}/componentes.json`, componente).pipe(
      map((res: any) => {
        componente.id = res.name;
        console.log(res);
        this.actualizarComponente(componente).subscribe();
        return res;
      })
    )
  }

  actualizarComponente(pregunta: Componente): Observable<Componente>{
    const preguntaTemp = { ...pregunta };
    // delete preguntaTemp.id;
    return this.http.put<Componente>(`${this.urlBase}/componentes/${pregunta.id}.json`, preguntaTemp);
  }

  eliminarComponente(id: string): Observable<any>{
    return this.http.delete(`${this.urlBase}/componentes/${id}.json`);
  }

  obtenerComponentesExamen(idExamen: string): Observable<any>{
    console.log(idExamen);
    this.size$.next(idExamen);
    return this.items2$;
  }

}
