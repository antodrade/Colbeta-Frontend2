import { Component } from '@angular/core';
import { PdfScannerService } from '../servicios/pdf-scanner.service'; // Import actualizado
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdf-scanner',
  templateUrl: './pdf-scanner.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class PdfScannerComponent {

  plantillaArchivo: File | null = null;
  firmaArchivo: File | null = null;
  pdfUrlPreview: SafeResourceUrl | null = null;
  cargando: boolean = false;

  constructor(
    private pdfScannerService: PdfScannerService, // Inyección del nuevo servicio
    private sanitizer: DomSanitizer
  ) {}

  onPlantillaSelected(event: any): void {
    this.plantillaArchivo = event.target.files[0] || null;
  }

  onFirmaSelected(event: any): void {
    this.firmaArchivo = event.target.files[0] || null;
  }

  procesarDocumento(): void {
    if (!this.plantillaArchivo || !this.firmaArchivo) {
      alert('Por favor selecciona ambos archivos.');
      return;
    }

    this.cargando = true;

    this.pdfScannerService.generarPdfEscaneado(this.plantillaArchivo, this.firmaArchivo)
      .subscribe({
        next: (blobResponse: Blob) => {
          this.cargando = false;

          // Crear URL temporal para previsualización
          const blobUrl = URL.createObjectURL(blobResponse);
          this.pdfUrlPreview = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        },
        error: (err) => {
          this.cargando = false;
          console.error('Error procesando el PDF:', err);
          alert('Ocurrió un error al procesar el documento.');
        }
      });
  }

  descargarPdf(): void {
    if (!this.plantillaArchivo || !this.firmaArchivo) return;

    this.pdfScannerService.generarPdfEscaneado(this.plantillaArchivo, this.firmaArchivo)
      .subscribe((blobResponse: Blob) => {
        const url = window.URL.createObjectURL(blobResponse);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documento_escaneado.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
}