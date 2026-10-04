import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { UsuarioService } from '../../usuario.service';
import { Usuario } from '../../models/usuario';
import { PdfComponent } from '../../components/pdf/pdf.component';
import { ReadXlsxComponent } from '../../components/read-xlsx/read-xlsx.component';
import { WriteXlsxComponent } from '../../components/write-xlsx/write-xlsx.component';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  private router = inject(Router);
  mensajeError: string = '';
  identificacionError: string = '';

  constructor(private usuarioServicio: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioServicio.obtenerUsuarioLista().subscribe({next:(datos) => {
      this.usuarios = datos;
    },
  error: (error: HttpErrorResponse)=>{
    console.log(error);
  }});
  }


  eliminarUsuarioPorId(nidentificacion: string): void {
     console.log('CLICK ELIMINAR1:', nidentificacion);
    this.extraerIdxIdentificacion(nidentificacion).subscribe(
      id => {this.usuarioServicio.eliminarUsuarioPorId(id).subscribe({
       next: resultado => {console.log(resultado);
           this.obtenerUsuarios();
        },
        error: (error: HttpErrorResponse) => {this.mensajeError = error.error.message;
        this.identificacionError = nidentificacion;
        }
      }
      )}
    )
   console.log('CLICK ELIMINAR2:', nidentificacion);
  }

  extraerIdxIdentificacion(nidentificacion: string): Observable<number> {
  return this.usuarioServicio.extraerIdxIdentificacion(nidentificacion);
  }
}
