import { Component, Input, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Usuario } from 'src/app/models/usuario';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'pdf',
  standalone: true,
  imports: [],
  templateUrl: './pdf.component.html',
 
})
export class PdfComponent implements OnInit {

@Input() usuarios: Usuario[]=[];
 tableData: any = [];

  ngOnInit(): void {
    this.tableData.push(['ID','Nombre','Primer Apellido','Segundo Apellido','EPS']);
    for (const usuario of this.usuarios){
      this.tableData.push([usuario.idUsuario, usuario.name1, usuario.lastname1, usuario.lastname2, usuario.eps])
    }
  }


  createPDF(){
   
const pdfDefinition: any = {
  content: [
    {
      table: {
        headerRows: 1,
        body: this.tableData
      }
    }
  ]
};

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}
