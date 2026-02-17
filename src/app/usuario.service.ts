import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 //private urlBase = "http://localhost:8080/hole/usuarios"
 //private urlBase = "https://colbeta-backend.onrender.com/hole/usuarios"
 private urlBase = `${environment.apiUrl}/hole/usuarios`;


  constructor(private clienteHttp: HttpClient) { }

  obtenerUsuarioLista(): Observable<Usuario[]>{
    return this.clienteHttp.get<Usuario[]>(this.urlBase);
  }

  agregarUsuarioLista(usuario: Usuario): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, usuario)
  }

}
