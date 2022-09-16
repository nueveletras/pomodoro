import {DatePipe} from '@angular/common';

/**
 * Función para sumar tiempos en formato HH:mm:ss y cacular el total de todos los tiempos de un arreglo
 * @param items Arreglo de registros a filtrar
 * @param property nombre de la propiedad a la que se aplicara el filtro
 * @param pipe instancia de DatePipe de angular/commons
 * @returns regresa un string con el formato HH:mm:ss que tiene la suma de todos los tiempos en el mismo formato
 */
export function calculateTotalTime(items: Array<any>, property: string, pipe: DatePipe): string {
  let totalTimeNumeric = 0
  for (let item of items) {
    totalTimeNumeric += Number(item[property].split(':')[1])
  }
  return `${pipe.transform(new Date(0, 0, 0, (Number((totalTimeNumeric/60).toFixed())), (totalTimeNumeric%60), 0), 'HH:mm:ss', 'es')}`
}
