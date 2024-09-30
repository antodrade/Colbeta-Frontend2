import { Component, Inject, OnInit } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import {Usuario2} from 'src/app/models/usuario2'
import {UsuarioService} from 'src/app/usuario.service'
import { Usuario } from '../../../models/usuario';
import { Table2 } from '../../../table2'

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    standalone: true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, Table2]
})
export class TablesComponent implements OnInit {

  usuarios: Usuario[]=[];
  table2!: Table2;
  constructor() { }
  ngOnInit(): void {
  //  this.usuarios = this.table2.obtenerUsuarios();
  // this.usuarios = this.table2.usuarios;
  }


}
