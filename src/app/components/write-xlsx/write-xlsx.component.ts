import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'write-xlsx',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './write-xlsx.component.html'
})
export class WriteXlsxComponent {
  public contentString: string | undefined;

  /* Constructor y ngOnInit */
  
  generateFile() {
    /* Convertimos el contenido a JSON */
     const content = JSON.parse(this.contentString!);
  
    /* Creamos una nueva hoja con el contenido */
    const sheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(content);
  
    /* Creamos un nuevo excel*/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
  
    /* Añadimos la hoja al nuevo excel */
    XLSX.utils.book_append_sheet(wb, sheet, "Hoja 1");
  
    /* Guardamos el fichero */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }
}
