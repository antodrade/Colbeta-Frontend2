import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from './models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

private urlBase = "http://localhost:8080/hole2/empresas"

  constructor(private clienteHttp: HttpClient ) { }

obtenerEmpresaLista(): Observable<Empresa[]>{
return this.clienteHttp.get<Empresa[]>(this.urlBase);
}



}
