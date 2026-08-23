import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormularioEps } from '../../models/formularioEps';
import { PdfService } from './../../service/pdf.service';
import { UsuarioService } from 'src/app/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { EmpresaService } from 'src/app/empresa.service';
import { Empresa } from 'src/app/models/empresa';
import { HttpClient } from '@angular/common/http';
import { PdfScannerService } from '../../servicios/pdf-scanner.service';

@Component({
  selector: 'form-eps',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-eps.component.html',
  styleUrl: './form-eps.component.scss'
})
export class FormEpsComponent {

  formulario: FormularioEps = new FormularioEps();
  usuarios: Usuario[] = [];
  empresas: Empresa[] = [];
  pdfProcesado: Uint8Array | null = null;

  opciones: string[] = ['Opción 1', 'Opción 2', 'Opción 3'];
  opcionSeleccionada: string = '';

  opciones2: string[] = ['Great Features', 'Clever Sinergy', 'Soft Skills Management'];
  opcionSeleccionada2: string = '';

  constructor(
    private pdfService: PdfService, 
    private pdfScannerService: PdfScannerService, 
    private usuarioServicio: UsuarioService, 
    private empresaServicio: EmpresaService,   
    private http: HttpClient
  ) {
    this.opciones = ['Opción 1', 'Opción 2', 'Opción 3'];
    this.opcionSeleccionada = '';
    this.opcionSeleccionada2 = '';
  }

  validar(): void {
    console.log("parcheeeeeeee");
    console.log(this.formulario.numdoc);
    this.obtenerUsuarios();
    this.obtenerEmpresas();
  }

  validar2(): void {
    console.log("validar22222222222222");
    console.log(this.formulario.numdoc);
    this.obtenerEmpresas();
    this.empresas.forEach(u => console.log(u));
  }

  obtenerUsuarios(): void {
    this.usuarioServicio.obtenerUsuarioLista().subscribe({
      next: (datos) => {
        this.usuarios = datos;
        this.usuarios.forEach((usuario, index) => {
          console.log("yuju1");
          if (Number(usuario.nidentificacion) === +this.formulario.usuario.nidentificacion) {
            this.formulario.usuario.name1 = this.usuarios[index].name1;
            this.formulario.usuario.name2 = this.usuarios[index].name2;
            this.formulario.usuario.lastname1 = this.usuarios[index].lastname1;
            this.formulario.usuario.lastname2 = this.usuarios[index].lastname2;
            this.formulario.usuario.ciudad = this.usuarios[index].ciudad;
            this.formulario.usuario.departamento = this.usuarios[index].departamento;
            this.formulario.usuario.direccion = this.usuarios[index].direccion;
            this.formulario.usuario.email = this.usuarios[index].email;
            this.formulario.usuario.celUsuario = this.usuarios[index].celUsuario;
            this.formulario.usuario.sexo = this.usuarios[index].sexo;
            this.formulario.usuario.fechaNac = this.usuarios[index].fechaNac;
            this.formulario.AFP = "Porvenir";
            this.formulario.ARL = "Sura";
            this.formulario.cargo = "Asesor Comercial";
            this.formulario.salario = "1.750.905";
            this.formulario.caja = "Cajacopi";
            this.formulario.usuario.tipoDoc = this.usuarios[index].tipoDoc;
            this.formulario.usuario.telUsuario = this.usuarios[index].telUsuario;
            this.formulario.usuario.urlFirma = this.usuarios[index].urlFirma;
            console.log("yuju2");
            console.log(this.usuarios[index].name1);
          }
        });
      },
      error: (err) => {
        console.error("Error caragando usuarios", err);
      }
    });
  }

  obtenerEmpresas(): void {
    this.empresaServicio.obtenerEmpresaLista().subscribe({
      next: (datos2) => {
        this.empresas = datos2;
        this.empresas.forEach((empresa, index) => {
          var index2 = index + 1;
          console.log("el idEmpresa de índice" + index2 + "es: " + this.formulario.empresa.idEmpresa);
          if (empresa.idEmpresa === Number(this.formulario.empresa.idEmpresa)) {
            console.log("idEMpresa selesccioando de formulario es: " + this.formulario.empresa.idEmpresa + " y el id de empresa en el arreglo es: " + empresa.idEmpresa);
            console.log(this.empresas[index].nidentificacion);
            this.formulario.empresa.municipio = this.empresas[index].municipio;
            this.formulario.empresa.departamento = this.empresas[index].departamento;
            this.formulario.empresa.direccion = this.empresas[index].direccion;
            this.formulario.empresa.nidentificacion = this.empresas[index].nidentificacion;
            this.formulario.empresa.correo = this.empresas[index].correo;
            this.formulario.empresa.telefono = this.empresas[index].telefono;
            this.formulario.empresa.tipoDoc = this.empresas[index].tipoDoc;
            this.formulario.empresa.nombre = this.empresas[index].nombre;
          }
        });
      },
      error: (err) => {
        console.error("Error cargando usuarios", err);
      }
    });
  }

  transformarFechaIng(fecha: string): string {
    const [anio, mes, dia] = fecha.split('-');
    const fechaFormateada = `${dia}${mes}${anio}`;
    return fechaFormateada.split('').join('   ');
  }

  transformarSexo(genero: string): string {
    if (genero == "Masculino") {
      return "            x";
    }
    if (genero == "Femenino") {
      return "x";
    } else {
      return "opa";
    }
  }

  transformarFechaNac(fechaStr: string): string {
    if (!fechaStr) return '';
    const [anio, mes, dia] = fechaStr.split('-');
    const numeros = `${dia}${mes}${anio}`.split('');
    return (
      numeros[0] + '  ' +
      numeros[1] + ' ' +
      numeros[2] + ' ' +
      numeros[3] + ' ' +
      numeros[4] + ' ' +
      numeros[5] + ' ' +
      numeros[6] + '  ' +
      numeros[7]
    );
  }

  generarPdfconDatos() {
    this.http.get('assets/formulario-base.pdf', { responseType: 'arraybuffer' }).subscribe(async (data: ArrayBuffer) => {
      const existingPdfBytes = new Uint8Array(data);

      const text31 = 'x';
      const text32 = 'x';
      const text = this.formulario.usuario.lastname1;
      const text2 = this.formulario.usuario.lastname2;
      const text3 = this.formulario.usuario.name1;
      const text4 = this.formulario.usuario.name2;
      const text5 = this.formulario.usuario.tipoDoc;
      const text6 = this.formulario.usuario.nidentificacion;
      const text7 = this.transformarSexo(this.formulario.usuario.sexo);
      const text8 = this.transformarFechaNac(this.formulario.usuario.fechaNac);
      const text9 = this.formulario.ARL;
      const text10 = this.formulario.AFP;
      const text11 = this.formulario.salario;
      const text12 = this.formulario.usuario.direccion;
      const text13 = this.formulario.usuario.telUsuario;
      const text14 = this.formulario.usuario.celUsuario;
      const text15 = this.formulario.usuario.email;
      const text16 = this.formulario.usuario.ciudad;
      const text17 = 'x';
      const text18 = '';
      const text19 = this.formulario.usuario.departamento;
      const text20 = this.formulario.empresa.nombre;
      const text21 = this.formulario.empresa.tipoDoc;
      const text22 = String(this.formulario.empresa.nidentificacion);
      const text23 = this.formulario.empresa.direccion;
      const text24 = this.formulario.empresa.telefono;
      const text25 = this.formulario.empresa.correo;
      const text26 = this.formulario.empresa.municipio;
      const text27 = this.formulario.empresa.departamento;
      const text28 = this.transformarFechaIng(this.formulario.fechaIng);
      const text29 = this.formulario.caja;
      const text30 = this.formulario.cargo;

      const x31 = 70;
      const y31 = 662;
      const x32 = 268;
      const y32 = 662;
      const x = 35;
      const y = 628;
      const x2 = 170;
      const y2 = 628;
      const x3 = 308;
      const y3 = 628;
      const x4 = 446;
      const y4 = 628;
      const x5 = 35;
      const y5 = 600;
      const x6 = 170;
      const y6 = 600;
      const x7 = 385;
      const y7 = 603;
      const x8 = 492;
      const y8 = 603;
      const x9 = 35;
      const y9 = 540;
      const x10 = 220;
      const y10 = 540;
      const x11 = 410;
      const y11 = 540;
      const x12 = 35;
      const y12 = 522;
      const x13 = 255;
      const y13 = 522;
      const x14 = 370;
      const y14 = 522;
      const x15 = 475;
      const y15 = 522;
      const x16 = 35;
      const y16 = 504;
      const x17 = 218;
      const y17 = 504;
      const x18 = 308;
      const y18 = 504;
      const x19 = 360;
      const y19 = 504;
      const x20 = 35;
      const y20 = 50;
      const x21 = 205;
      const y21 = 50;
      const x22 = 380;
      const y22 = 50;
      const x23 = 35;
      const y23 = 28;
      const x24 = 175;
      const y24 = 28;
      const x25 = 240;
      const y25 = 28;
      const x26 = 390;
      const y26 = 28;
      const x27 = 530;
      const y27 = 28;
      const x28 = 497;
      const y28 = 553;
      const x29 = 370;
      const y29 = 533;
      const x30 = 200;
      const y30 = 106;

      console.log("imprimir todos los text a ver cual es el que sale undefined: " + text, text2, text3, text4, text5, text6, text7, text8,
        text9, text10, text11, text12, text13, text14, text15, text16, text17, text18, text19, text20, text21, text22, text23, text24,
        text25, text26, text27, text28, text29, text30, text31, text32);

      this.pdfProcesado = await this.pdfService.addTextToPdf(existingPdfBytes, text, text2, text3, text4, text5, text6, text7, text8,
        text9, text10, text11, text12, text13, text14, text15, text16, text17, text18, text19, text20, text21, text22, text23, text24,
        text25, text26, text27, text28, text29, text30, text31, text32, x, y, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7, x8, y8,
        x9, y9, x10, y10, x11, y11, x12, y12, x13, y13, x14, y14, x15, y15, x16, y16, x17, y17, x18, y18, x19, y19, x20, y20, x21, y21,
        x22, y22, x23, y23, x24, y24, x25, y25, x26, y26, x27, y27, x28, y28, x29, y29, x30, y30, x31, y31, x32, y32);

      // =========================================================
      // 2. DESCARGA Y CONVERSIÓN DE ARCHIVOS (Dentro del callback async)
      // =========================================================
      if (this.pdfProcesado) {
        const urlFirma = this.formulario.usuario.urlFirma; // URL que viene de Firestore
        
        // Descargas y conviertes las imágenes a File
        const firmaFile = await this.urlToFile(urlFirma, 'firma1.png');
        const firmaFile2 = firmaFile; // Duplicada temporalmente

        // Conviertes el Uint8Array procesado a File
        const plantillaFile = this.uint8ArrayToFile(this.pdfProcesado, 'plantilla.pdf');

        // =========================================================
        // 3. LLAMADA AL SERVICIO BACKEND
        // =========================================================
        this.pdfScannerService.generarPdfEscaneado(plantillaFile, firmaFile, firmaFile2)
          .subscribe({
            next: (res) => {
              console.log('PDF generado exitosamente', res);
              // 1. Crear URL temporal a partir del Blob recibido
      const blobUrl = URL.createObjectURL(res);

      // 2. Crear enlace HTML invisible para forzar la descarga
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = `formulario_${this.formulario.usuario.nidentificacion || 'eps'}.pdf`;

      // 3. Simular click para iniciar la descarga
      anchor.click();

      // 4. Limpiar el objeto de la memoria
      URL.revokeObjectURL(blobUrl);
            },
            error: (err) => console.error('Error enviando al backend:', err)
            
          });
      }

    }); // <-- Cierre correcto del subscribe
  }

  // Método helper 1
  private async urlToFile(url: string, fileName: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type || 'image/png' });
  }

private uint8ArrayToFile(bytes: Uint8Array, fileName: string): File {
  // Le indicamos explícitamente a TypeScript que es un ArrayBuffer nativo
  const arrayBuffer = bytes.buffer.slice(
    bytes.byteOffset, 
    bytes.byteOffset + bytes.byteLength
  ) as ArrayBuffer;

  const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
  return new File([blob], fileName, { type: 'application/pdf' });
}

}



