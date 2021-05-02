import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
  export class Tab1Page implements OnInit {

    noticias: Article[] = []; // porque parte de la respuesta del observable es un arreglo

    constructor( private dataService: DataService) { }

    ngOnInit() {
      this.dataService.getNoticias().subscribe( respuesta => {  // al tratarse de un observable, es necesario hacer un subscribe
        console.log ("Respuesta", respuesta);
        this.noticias.push( ...respuesta.articles ); // cargamos el arreglo solo con la parte de títulos de  noticias (articles)
        console.log ("Noticias", this.noticias);
      }
        );
    }

  }
