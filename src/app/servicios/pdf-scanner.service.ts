import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfScannerService {

// private apiUrl = 'http://localhost:8080/api/pdf/firmar-y-escanear';
private apiUrl = `${environment.apiUrl}/api/pdf/firmar-y-escanear`

  constructor(private http: HttpClient) { }

  /**
   * Envía la plantilla y la firma al backend y recibe el PDF procesado como un Blob.
   */
  generarPdfEscaneado(plantillaFile: File, firmaFile: File): Observable<Blob> {
   const   token2 = localStorage.getItem('token2')
    const headers = new HttpHeaders({
          'Authorization': `Bearer ${token2}`
        });
    const formData = new FormData();
    
    // Nombres de parámetros requeridos por el controller de Spring
    formData.append('plantilla', plantillaFile);
    formData.append('firma', firmaFile);

    return this.http.post(this.apiUrl, formData,  { headers,
      responseType: 'blob' // Necesario para respuestas binarias/archivos
    });
  }
}
