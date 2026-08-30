import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class PilaFlatFileService {

  // Nombres de las 98 columnas de Arus / Res. 2388
  private readonly HEADERS_REGISTRO_2 = [
    'Tipo de registro', 'Secuencia', 'Tipo documento cotizante', 'Documento cotizante', 'Tipo de cotizante',
    'Subtipo de cotizante', 'Extranjero', 'Colombiano en el exterior', 'Departamento', 'Municipio',
    'Primer apellido', 'Segundo apellido', 'Primer nombre', 'Segundo nombre', 'ING', 'RET', 'TDE', 'TAE',
    'TDP', 'TAP', 'VSP', 'Línea', 'VST', 'SLN', 'IGE', 'LMA', 'VAC-LR', 'AVP', 'VCT', 'IRL', 'AFP',
    'AFP Traslado', 'EPS', 'EPS Traslado', 'CCF', 'Días AFP', 'Días EPS', 'Días ARL', 'Días CCF',
    'Salario básico', 'Tipo Salario', 'IBC AFP', 'IBC EPS', 'IBC ARL', 'IBC CCF', 'Tarifa AFP',
    'Cotización AFP', 'AVP afiliado', 'AVP aportante', 'Total AFP', 'Aporte FSP', 'Aporte FSPS',
    'Valor no retenido', 'Tarifa EPS', 'Cotización EPS', 'Valor UPC', 'Número IGE', 'Valor IGE',
    'Número LMA', 'Valor LMA', 'Tarifa ARL', 'Centro de trabajo', 'Cotización ARL', 'Tarifa CCF',
    'Aporte CCF', 'Tarifa SENA', 'Aporte SENA', 'Tarifa ICBF', 'Aporte ICBF', 'Tarifa ESAP',
    'Aporte ESAP', 'Tarifa MEN', 'Aporte MEN', 'Tipo documento UPC', 'Documento UPC', 'Exonerado',
    'ARL', 'Clase riesgo', 'Tarifa especial AFP', 'Fecha ING', 'Fecha RET', 'Fecha inicio VSP',
    'Fecha inicio SLN', 'Fecha final SLN', 'Fecha inicio IGE', 'Fecha final IGE', 'Fecha inicio LMA',
    'Fecha final LMA', 'Fecha inicio VAC-LR', 'Fecha final VAC-LR', 'Fecha inicio VCT', 'Fecha final VCT',
    'Fecha inicio IRL', 'Fecha final IRL', 'IBC otros parafiscales', 'Número horas laboradas',
    'Fecha radicación exterior', 'Actividad económica para ARL'
  ];

  /**
   * Genera el contenido del archivo plano .txt para Arus
   */
  generarArchivoPlanoArus(idEmpresa: number): string {
    // Fila 1: Datos de aportante (Registro tipo 01)
    const registro1 = '01101CLEVER SINERGY SAS       NI9015579146E877047890022026-072026-08';
    
    // Fila 2: Ejemplo de cotizante (Registro tipo 02)
    const registro2 = '0200001CC106583920101008001PEREZ               JUAN                230301EPS002CCF05303030300003000000F';

    return `${registro1}\n${registro2}`;
  }

  /**
   * Genera la plantilla .xlsx oficial para Arus con 4 filas
   */
  generarExcelArus(empresa: any, cotizantes: any[]): void {
    const fila1Header = [
      'Tipo de Registro', 'Modalidad de la Planilla', 'Secuencia', 'Nombre o Razón Social del Aportante',
      'Tipo Documento', 'Nº de Identificación', 'Digito de Verificación', 'Tipo Planilla',
      'Número Planilla Asociada a esta planilla', 'Fecha de Pago Planilla Asociada a esta planilla',
      'Forma Presentación', 'Código Sucursal Aportante', 'Nombre Sucursal', 'Código ARL',
      'Periodo Pago a Sistemas Diferentes a Salud', 'Periodo Pago al Sistema de Salud',
      'Número  de Planilla', 'Fecha de Pago', 'Número total de cotizantes', 'Valor Total Nómina',
      'Tipo de Aportante', 'Código del Operador de Información'
    ];

    const totalNomina = cotizantes.reduce((sum, c) => sum + (Number(c.salarioBasico) || 0), 0);
    const fila2Data = [
      1, 1, 1, empresa.razonSocial || 'CLEVER SINERGY SAS', empresa.tipoDocumento || 'NI',
      empresa.numDoc || '901557914', empresa.dv || 6, 'E', '', '',
      'S', '002', 'SEGUNDA', '14-11', empresa.periodoPension || '2026-07', empresa.periodoSalud || '2026-08',
      87704789, '', cotizantes.length, totalNomina, 1, 88
    ];

    const fila3Header = this.HEADERS_REGISTRO_2;

    const filasCotizantes = cotizantes.map((c, index) => [
      2, index + 1, c.tipoDocumento || 'CC', c.numDoc || '', 1,
      0, '', '', 8, 1, c.primerApellido || '', '',
      c.primerNombre || '', '', '', '', '',
      '', '', '', '', '', '', '',
      '', '', '', 0, '', 0,
      '230301', '', 'EPS002', '',
      'CCF05', 30, 30, 30, 30,
      c.salarioBasico || 0, 'F', c.salarioBasico || 0, c.salarioBasico || 0, c.salarioBasico || 0,
      c.salarioBasico || 0, 0.16, 0, 0,
      0, 0, 0, 0,
      0, 0.04, 0, 0,
      '', 0, '', 0,
      0.00522, 0, 0, 0.04,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, '', '', 'S',
      '14-11', 1, '', '',
      '', '', '', '',
      '', '', '', '',
      '', '', '', '',
      '', '', 0,
      240, '', 1692001
    ]);

    const matrixData = [fila1Header, fila2Data, fila3Header, ...filasCotizantes];

    const worksheet = XLSX.utils.aoa_to_sheet(matrixData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Planilla base');

    const fileName = `NI${empresa.numDoc || '901557914'}_87704789_${empresa.periodoPension || '202607'}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }
}