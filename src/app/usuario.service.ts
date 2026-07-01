import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario';
import { environment } from '../environments/environment';
import { LoginData } from './models/loginData';
import { Empleado } from './models/empleado';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
empleado: Empleado = new Empleado;
 //private urlBase = "http://localhost:8080/hole/usuarios"
 //private urlBase = "https://colbeta-backend.onrender.com/hole/usuarios"
 private urlBase = `${environment.apiUrl}/hole/usuarios`;
private urlBaselog = `${environment.apiUrl}/auth/login`;
private urlBasereg = `${environment.apiUrl}/auth/register`;


  constructor(private clienteHttp: HttpClient) { }

  obtenerUsuarioLista(): Observable<Usuario[]>{
    const token2 = localStorage.getItem('token2')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token2}`
    });
    return this.clienteHttp.get<Usuario[]>(this.urlBase, { headers });
  }

  loguearse(username: string, password: string): Observable<string>{
    
    const body = {
      "username" : username,
      "password" : password
    }
    return this.clienteHttp.post(this.urlBaselog,  body , { responseType: 'text'});
  } 

  agregarUsuarioLista(usuario: Usuario): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, usuario)
  }

  agregarUsuarioData(loginData: LoginData): Observable<Object>{
    this.empleado.username=loginData.usuario;
    this.empleado.password=loginData.password
    this.empleado.rol="okis";
    this.empleado.nombreReal="okis okis"
    return this.clienteHttp.post(this.urlBasereg, this.empleado)
  }

}
