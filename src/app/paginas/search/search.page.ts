import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  albumes: Observable<any>;
  textoBuscar: string;  // propiedad que almacenará el texto escrito en search

  constructor( private dataService: DataService) { }

  ngOnInit() {
    this.albumes= this.dataService.getAlbumes(); // al tratarse de un observable, es necesario hacer un subscribe
  }

  onSearchChange( event ) {
    console.log(event);
    this.textoBuscar = event.detail.value; // asignación del texto escrito en search
  }
}
