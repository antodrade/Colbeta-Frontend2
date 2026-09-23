import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilaFlatFileService } from './pila-flat-file-service';
import { UsuarioService } from '../../usuario.service';
import { Usuario } from '../../models/usuario';
import { Cotizante } from '../../models/cotizante';

@Component({
  selector: 'app-plano-pila',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plano-pila.component.html'
})
export class PlanoPilaComponent {
  private pilaService = inject(PilaFlatFileService);

  private usuarioService = inject(UsuarioService);
  //public usuario = inject(Usuario);
  usuarios: Usuario[] = []
  cotizantesPila: Cotizante[] = [];

   
  // Estado del componente con Signals
  isGenerating = signal<boolean>(false);
  operador = signal<'ARUS' | 'SIMPLE'>('ARUS');

  // Datos mock/reales de la empresa
  empresa = signal({
    razonSocial: 'CLEVER SINERGY SAS',
    tipoDocumento: 'NI',
    numDoc: '901557914',
    dv: '6',
    periodoPension: '2026-07',
    periodoSalud: '2026-08',
    totalNomina: 15000000
  });

  // Lista de cotizantes
  cotizantes = signal<any[]>([
    {
      numDoc: '1065839201',
      primerNombre: 'JUAN',
      primerApellido: 'PEREZ',
      salarioBasico: 3000000,
      AFP: '230301'
    },
    {
      numDoc: '1065839202',
      primerNombre: 'MARIA',
      primerApellido: 'GOMEZ',
      salarioBasico: 3000000,
      AFP:'25-14'
    }
  ]);

   cotizantes2 = signal<any[]>([]);



  



  ngOnInit(): void{
this.usuarioService.obtenerUsuarioLista().subscribe(
    usuarios => { this.usuarios = usuarios

      usuarios.forEach((usuario, index) =>{
        console.log(usuarios);
    this.cotizantesPila.push({
      numDoc: usuario.nidentificacion,
      primerNombre: usuario.name1,
      primerApellido: usuario.lastname1,
      salarioBasico: '1750905',
      AFP: '230301'
    })
  }) 
  //this.cotizantes.set(this.cotizantesPila);
  console.log("console despues del forEach", this.cotizantesPila);
  this.cotizantes.set(this.cotizantesPila);
    });



  }


  


  descargarPlano(): void {
    this.isGenerating.set(true);

    setTimeout(() => {
      try {
        const contenido = this.pilaService.generarArchivoPlanoArus(1);
        const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `PLANO_PILA_${this.empresa().numDoc}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error al generar archivo plano:', error);
      } finally {
        this.isGenerating.set(false);
      }
    }, 500);
  }

  descargarExcel(): void {
    this.isGenerating.set(true);

    setTimeout(() => {
      try {
        this.pilaService.generarExcelArus(this.empresa(), this.cotizantes());
      } catch (error) {
        console.error('Error al generar Excel:', error);
      } finally {
        this.isGenerating.set(false);
      }
    }, 500);
  }
}