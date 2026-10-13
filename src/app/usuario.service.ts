import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario';
import { environment } from '../environments/environment';
import { LoginData } from './models/loginData';
import { Empleado } from './models/empleado';
import { RegistroEmpleado } from './models/registroEmpleado';


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
    
  
    return this.clienteHttp.get<Usuario[]>(this.urlBase);
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

  agregarUsuarioData(registroEmpleado: RegistroEmpleado): Observable<Object>{ 
    return this.clienteHttp.post(this.urlBasereg, registroEmpleado)
  }

eliminarUsuarioPorId(id: number){
    return this.clienteHttp.delete(`${this.urlBase}/${id}`)
  }
  

  extraerIdxIdentificacion(identificacion: string): Observable<number>{
     return this.clienteHttp.get<number>(`${this.urlBase}/identificacion/${identificacion}`)
  }

  

}
