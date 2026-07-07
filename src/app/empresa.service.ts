import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from './models/empresa';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

//private urlBase = "http://localhost:8080/hole2/empresas"
//private urlBase = "https://colbeta-backend.onrender.com/hole2/empresas"
private urlBase = `${environment.apiUrl}/hole2/empresas`; 


  constructor(private clienteHttp: HttpClient ) { }

obtenerEmpresaLista(): Observable<Empresa[]>{
    const token2 = localStorage.getItem('token2')
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token2}`
      });
return this.clienteHttp.get<Empresa[]>(this.urlBase, {headers});
}


 agregarEmpresa(empresa: Empresa): Observable<Object>{
      const token2 = localStorage.getItem('token2')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token2}`
    });
    return this.clienteHttp.post(this.urlBase, empresa, {headers})
  }





}
