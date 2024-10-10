import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = "http://localhost:8080/hole/usuarios"


  constructor(private clienteHttp: HttpClient) { }

  obtenerUsuarioLista(): Observable<Usuario[]>{
    return this.clienteHttp.get<Usuario[]>(this.urlBase);
  }

  agregarUsuarioLista(usuario: Usuario): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, usuario)
  }

}
