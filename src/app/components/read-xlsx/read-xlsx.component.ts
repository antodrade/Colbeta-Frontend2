import { Component, OnInit } from '@angular/core';
import  * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import { File } from 'buffer';
import { Planilla } from '../../models/planilla';
import { indexOf } from 'lodash-es';



@Component({
  selector: 'read-xlsx',
  standalone: true,
  imports: [],
  templateUrl: './read-xlsx.component.html',
})
export class ReadXlsxComponent implements OnInit{
  public target: DataTransfer | undefined;
  
  constructor() { }

  ngOnInit(): void { }

  dataok: Planilla[]=[]

  incomingFile(event: any) {
    this.target = <DataTransfer>(event.target);
    if (this.target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
  }



  processFile() {
    const reader: FileReader = new FileReader();
   
    reader.readAsBinaryString(this.target!.files[0]);
    reader.onload = (e: any) => {
      /* Creamos el objeto WorkBook con los datos del fichero cargado */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* Recorremos los nombres de las hojas */

      wb.SheetNames.forEach((sheetName: string) => {
        console.log(`Sheet name: ${sheetName}`);

        /* Obtenemos los datos de las hojas */
        const sheet: XLSX.WorkSheet = wb.Sheets[sheetName];
        const data: Planilla[] = XLSX.utils.sheet_to_json(sheet);
       

      //   const personasArray = data.map(persona => [
      //   persona.x1,
      //   persona.x2,
      //   persona.x3,
      //   persona.x4,
      //   persona.x5,
      //   persona.x6,
      //   persona.x7,
      //   persona.x8,
      //   persona.x9,
      //   persona.x10,
      //   persona.x11,
      //   persona.x12,
      //   persona.x13,
      //   persona.x14,
      
      // ]);

      const personasArray = data.map(persona => {
        return Object.entries(persona).map(([propiedad, valor]) => {
          return `${valor}`;
        });
      });
        console.log(data); // Data will be logged in array format containing objects
        console.log("imprimir el arreglo")
        console.log("este es al arreglo de personas array: "+personasArray);
        console.log("ahora vamos a examinar en detalle")
        console.log("el registro elegido en el original es: "+data[0].x1)
        console.log("el registro elegido es: "+personasArray[0])
        // let anexodata = {Marca: "holaaaaa",Modelo: "Chaooooo", Precio:"3 millones"}
        // data.push(anexodata);
        const jsonData = JSON.stringify(data);
        const jsondata2 = JSON.stringify(personasArray);
        // console.log(jsonData)
        console.log(jsondata2);
         this.generateFile(jsondata2);
      });
    };
  }
 
  data4 = [
    {"a": 1, "b": 2, "c":3},
    {"a": 4, "b": 5, "c":6}, 
    {"a": 7, "b": 8, "c":9}
  ]
  
  

  public contentString: string | undefined;

  /* Constructor y ngOnInit */
  
   data2 = [
    ['Nombre', 'Apellido', 'Edad'],
    ['Juan', 'Pérez', 30],
    ['María', 'López', 25]
  ];

  generateFile(data:  any) {
    /* Convertimos el contenido a JSON */
    //  const content = JSON.parse(this.contentString!);
     const content = JSON.parse(data);
  
    /* Creamos una nueva hoja con el contenido */
    const sheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(content);
  
    /* Creamos un nuevo excel*/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
  
    /* Añadimos la hoja al nuevo excel */
    XLSX.utils.book_append_sheet(wb, sheet, "Hoja 1");
  
    /* Guardamos el fichero */
    XLSX.writeFile(wb, "sheetjs.xlsx");

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(content);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
    
    XLSX.writeFile(workbook, 'mi_excel.xlsx');

    
    

  }

 

}
