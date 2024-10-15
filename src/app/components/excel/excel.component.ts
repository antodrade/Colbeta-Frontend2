import { Component } from '@angular/core';
import  * as XLSX from 'xlsx';

@Component({
  selector: 'excel',
  standalone: true,
  imports: [],
  templateUrl: './excel.component.html',
 
})
export class ExcelComponent {

  
  
  data = [
     { name: 'John Doe', age: 30 },
     { name: 'Jane Smith', age: 25 }
   ];

  exportToExcel(): void {
    const dataWithoutHeaders = this.data.map(item => Object.values(item));
    const worksheet = XLSX.utils.json_to_sheet(dataWithoutHeaders);
    // const worksheet = XLSX.utils.json_to_sheet(this.data);
    const workbook = XLSX.utils.book_new();
    workbook.Sheets['Data'] = worksheet;
    XLSX.writeFile(workbook, 'data.xlsx');

  // Genera el archivo Excel en formato de datos binarios
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Crea un enlace de descarga y lo simula para iniciar la descarga
  const data: Blob = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
  const fileURL = URL.createObjectURL(data);   

  const link = document.createElement('a');
  link.href = fileURL;
  link.download = 'data.xlsx';
  link.click();

  // Libera el URL
  URL.revokeObjectURL(fileURL);

  }

}
