import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EmpresaService } from '../../empresa.service';
import { Empresa } from '../../models/empresa';
import { PdfComponent } from '../../components/pdf/pdf.component';
import { ReadXlsxComponent } from '../../components/read-xlsx/read-xlsx.component';
import { WriteXlsxComponent } from '../../components/write-xlsx/write-xlsx.component';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  standalone: true,
  imports: [
    RouterLink,
    PdfComponent, ReadXlsxComponent, WriteXlsxComponent
  ]
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[] = [];

  constructor(private empresaServicio: EmpresaService) { }

  ngOnInit(): void {
    this.obtenerEmpresas();
  }

  obtenerEmpresas(): void {
    this.empresaServicio.obtenerEmpresaLista().subscribe((datos) => {
      this.empresas = datos;
    });
  }
}
