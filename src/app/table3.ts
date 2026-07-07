

import { Component, Inject, Injectable, OnInit, Output } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, ButtonDirective } from '@coreui/angular';
import {Usuario2} from 'src/app/models/usuario2'
import {UsuarioService} from './usuario.service'
import { Usuario } from './models/usuario';
import {PdfComponent} from './components/pdf/pdf.component';
import { EventEmitter } from 'stream';

import {ReadXlsxComponent} from './components/read-xlsx/read-xlsx.component';
import {WriteXlsxComponent} from './components/write-xlsx/write-xlsx.component';
import { RouterLink } from '@angular/router';
import { SourceTextModule } from 'vm';
import { EmpresaService } from './empresa.service';
import { Empresa } from './models/empresa';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'table3',
  templateUrl: './table3.component.html',
  standalone: true,
    imports: [ WriteXlsxComponent, ReadXlsxComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, 
      CardBodyComponent, DocsExampleComponent, TableDirective, TableColorDirective, TableActiveDirective, 
      BorderDirective, AlignDirective, ButtonDirective, PdfComponent, RouterLink], 
})

export class Table3 {

    token  = "";
    usuarios: Usuario[]=[
      //   {
      //       idUsuario: 1,
      //       nombre1: 'xxxxx',
      //       nombre2: 'xxxxx',
      //       apellido1: 'xxxxx',
      //       apellido2: 'xxxxxx',
      //       eps: 'xxxxxx',
      //       fechaIngreso: new Date(86400000),
      //       direccion: 'xxxxxx',
      //       ciudad: 'xxxxxxx'
      //   },
      //   {
      //     idUsuario: 2,
      //     nombre1: 'yyyyyyy',
      //     nombre2: 'yyyyyyy',
      //     apellido1: 'yyyyy',
      //     apellido2: 'yyyyyy',
      //     eps: 'yyyyyyy',
      //     fechaIngreso: new Date(86400000),
      //     direccion: 'yyyyyyy',
      //     ciudad: 'yyyyyyy'
      // }
    ]; 

    empresas: Empresa[]=[]

    // @Output() usuariosEventEmitter = new EventEmitter();


    constructor(private empresaServicio: EmpresaService) { }
  ngOnInit(): void {
     this.obtenerEmpresas();
    
  }


  
  obtenerEmpresas(): void {
    this.empresaServicio.obtenerEmpresaLista().subscribe(
      (datos =>{
        this.empresas=datos;
      })   );
      //  this.usuarioServicio.loguearse("Antonio6","123456789").subscribe(
      //   datos => {
      //     this.token = datos;
      //     console.log('Token recibido con éxito:', this.token);
      //     localStorage.setItem('token',datos)
      //     //localStorage.setItem('jambalaooo','opaopaopaopa')
      //     localStorage.setItem('jambalaooo111111111','666666666')
      //   sessionStorage.setItem('jambalaooo22222222','777777777')
      //   localStorage.setItem('umpalumpa','vea usted');
      //   }
      // )
  
    
    }

    newUser(): void {
      console.log("ombeeeeeee")
    }
 
  }