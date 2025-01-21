

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


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'table2',
  templateUrl: './table2.component.html',
  standalone: true,
    imports: [ WriteXlsxComponent, ReadXlsxComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, 
      CardBodyComponent, DocsExampleComponent, TableDirective, TableColorDirective, TableActiveDirective, 
      BorderDirective, AlignDirective, ButtonDirective, PdfComponent, RouterLink], 
})

export class Table2 {

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

    // @Output() usuariosEventEmitter = new EventEmitter();


    constructor(private usuarioServicio: UsuarioService) { }
  ngOnInit(): void {
     this.obtenerUsuarios();
   
  }


  
  obtenerUsuarios(): void {
    this.usuarioServicio.obtenerUsuarioLista().subscribe(
      (datos =>{
        this.usuarios=datos;
      })
     );
    
    }

    newUser(): void {
      console.log("ombeeeeeee")
    }
 
  }