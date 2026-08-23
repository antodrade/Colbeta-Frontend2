import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UsuarioService } from '../../usuario.service';
import { Usuario } from '../../models/usuario';
import { PdfComponent } from '../../components/pdf/pdf.component';
import { ReadXlsxComponent } from '../../components/read-xlsx/read-xlsx.component';
import { WriteXlsxComponent } from '../../components/write-xlsx/write-xlsx.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  standalone: true,
  imports: [
    RouterLink,
    PdfComponent, ReadXlsxComponent, WriteXlsxComponent
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioServicio: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioServicio.obtenerUsuarioLista().subscribe((datos) => {
      this.usuarios = datos;
    });
  }
}
