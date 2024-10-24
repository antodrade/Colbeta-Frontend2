import { Component, input, Input, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { delay } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Table2 } from 'src/app/table2';
import { UsuarioService } from 'src/app/usuario.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'pdf',
  standalone: true,
  imports: [],
  templateUrl: './pdf.component.html',
 
})
export class PdfComponent implements OnInit {


usuarios: Usuario[]=[];
 tableData: any = [];
//  usuarios2: Usuario[]=[
//     {
//         idUser: 1,
//         name1: 'xxxxx',
//         name2: 'xxxxx',
//         lastname1: 'xxxxx',
//         lastname2: 'xxxxxx',
//         eps: 'xxxxxx',
//         fechaIngreso: new Date(86400000),
//         direccion: 'xxxxxx',
//         ciudad: 'xxxxxxx'
//     },
//     {
//       idUser: 2,
//       name1: 'yyyyyyy',
//       name2: 'yyyyyyy',
//       lastname1: 'yyyyy',
//       lastname2: 'yyyyyy',
//       eps: 'yyyyyyy',
//       fechaIngreso: new Date(86400000),
//       direccion: 'yyyyyyy',
//       ciudad: 'yyyyyyy'
//   }
// ]; 

constructor(private usuarioServicio: UsuarioService) { 

}



  ngOnInit(): void {
    this.obtenerUsuarios()
   
  }
  operar(): void {
    this.tableData.push(['ID','Nombre','Primer Apellido','Segundo Apellido','EPS']);
    for (const usuario of this.usuarios){
      this.tableData.push([usuario.idUser, usuario.name1, usuario.lastname1, usuario.lastname2, usuario.eps]);
    }
  }
 

  obtenerUsuarios(): void {
    
    this.usuarioServicio.obtenerUsuarioLista().subscribe(
      (datos =>{
        this.usuarios=datos;
        this.operar();
      })
      
     );
     
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
