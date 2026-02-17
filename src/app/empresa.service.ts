import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from './models/empresa';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

//private urlBase = "http://localhost:8080/hole2/empresas"
//private urlBase = "https://colbeta-backend.onrender.com/hole2/empresas"
private urlBase = `${environment.apiUrl}/hole2/empresas`; 


  constructor(private clienteHttp: HttpClient ) { }

obtenerEmpresaLista(): Observable<Empresa[]>{
return this.clienteHttp.get<Empresa[]>(this.urlBase);
}



}
