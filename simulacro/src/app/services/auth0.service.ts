import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { logging } from 'protractor';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {
  usuario: Observable<Usuario>;
  constructor(public auth: AuthService) { }

  loging(): void{
    this.usuario = this.auth.loginWithRedirect() as unknown as Observable<Usuario>;
  }

  logout(){
    this.auth.logout()
    this.usuario = null;
  }
}
