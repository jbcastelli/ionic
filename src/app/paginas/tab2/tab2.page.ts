import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticiasCategoria : Article[] = [];

  constructor( private dataService: DataService) { }

  ngOnInit() {
    this.cargarNoticias( this.categorias[0] );
  }

  // cargarNoticias optimiza el código redundante utilizado en ngOnInit y en cambioCategoría
  cargarNoticias( categoria: string){
    this.dataService.getNoticiasCategoria( categoria ).subscribe( respuesta => {
      console.log('Respuesta', respuesta);
      this.noticiasCategoria.push( ...respuesta.articles );
    });
  }

  // cambioCategoria implemetará la lógica para mostrar las noticias acorde a la categoría seleccionada
  cambioCategoria( evento){
    console.log( evento.detail.value );
    this.noticiasCategoria = []; // encero el arreglo porque caso contrario estaría añadiendo los registros de la nueva categoría
    this.cargarNoticias( evento.detail.value );
  }
}
