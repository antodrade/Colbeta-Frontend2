

import { Component, Inject, OnInit } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import {Usuario2} from 'src/app/models/usuario2'
import {UsuarioService} from 'src/app/usuario.service'
import { Usuario } from './models/usuario';


@Component({
  selector: 'table2',
  templateUrl: './table2.component.html',
  standalone: true,
    imports: [ RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective]
})

export class Table2 {
    usuarios: Usuario[]=[
        {
            idUsuario: 1,
            nombre1: 'xxxxx',
            nombre2: 'xxxxx',
            apellido1: 'xxxxx',
            apellido2: 'xxxxxx',
            eps: 'xxxxxx',
            fechaIngreso: new Date(86400000),
            direccion: 'xxxxxx',
            ciudad: 'xxxxxxx'
        },
        {
          idUsuario: 2,
          nombre1: 'yyyyyyy',
          nombre2: 'yyyyyyy',
          apellido1: 'yyyyy',
          apellido2: 'yyyyyy',
          eps: 'yyyyyyy',
          fechaIngreso: new Date(86400000),
          direccion: 'yyyyyyy',
          ciudad: 'yyyyyyy'
      }
    ]; 

    constructor() { }
  ngOnInit(): void {
    //  this.obtenerUsuarios();
   
  }

  
  obtenerUsuarios(): Usuario[] {
    // this.usuarioServicio.obtenerUsuarioLista().subscribe(
    //   (datos =>{
    //     this.usuarios=datos;
    //   })
    //  );
     return this.usuarios;
    }

  }