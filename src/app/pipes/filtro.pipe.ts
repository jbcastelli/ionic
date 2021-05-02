import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

      transform(
        arreglo: [any],
        texto: string = '',
        columna: string = 'title' // valor por default de la columna a filtrar/buscar
        ): any[] {

        if ( texto === '' ) {
          // si el texto es exactamente igual a vacío, debo retornar el mismo arreglo
          return arreglo;
        }

        if ( !arreglo ) {
          // si el arreglo viene vacío (el data.service no envió información), debo retornar lo que contiene el arreglo
          return arreglo;
        }

        // si tengo contenido en el texto y en el arreglo, entonces ahí puedo aplicar el filtro

        texto = texto.toLowerCase(); // convierto a LowerCase para hace el match, ya que la búsqueda en JS es case sensitive

        // filter() es el filtro de JavaScript
        // title es el campo por el cual voy a filtrar/buscar
        return arreglo.filter(
          filtrado => filtrado[columna].toLowerCase().includes( texto )
        );
      }

}
