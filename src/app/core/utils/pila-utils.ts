/**
 * Redondea un valor al centenar más cercano según la Resolución 2388 de Colombia.
 * Específicamente para el sistema PILA (Planilla Integrada de Liquidación de Aportes).
 * 
 * @param valor El importe monetario a redondear.
 * @returns El valor redondeado como un entero sin decimales.
 */
export function redondearPila(valor: number): number {
  if (valor === null || valor === undefined || isNaN(valor)) {
    return 0;
  }
  // La normativa exige redondeo al centenar más cercano superior.
  // Ejemplo: 10.401 -> 10.500
  return Math.ceil(valor / 100) * 100;
}
