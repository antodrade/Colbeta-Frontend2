import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 //private urlBase = "http://localhost:8080/hole/usuarios"
 //private urlBase = "https://colbeta-backend.onrender.com/hole/usuarios"
 private urlBase = `${environment.apiUrl}/hole/usuarios`;
private urlBaselog = `${environment.apiUrl}/auth/login`;


  constructor(private clienteHttp: HttpClient) { }

  obtenerUsuarioLista(): Observable<Usuario[]>{
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBbnRvbmlvNiIsImlhdCI"+
    "6MTc3OTc1MjI4MiwiZXhwIjoxNzc5NzU1ODgyfQ.86rwLI1kybfE6CJzkgHJ980sEmGdjn_QPnkKRAbCBDU";
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.clienteHttp.get<Usuario[]>(this.urlBase, { headers });
  }

  loguearse(): Observable<string>{
    
    const body = {
      "username" : "Antonio6",
      "password" : "123456789"
    }
    return this.clienteHttp.post(this.urlBaselog,  body , { responseType: 'text'});
  } 

  agregarUsuarioLista(usuario: Usuario): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, usuario)
  }

}
