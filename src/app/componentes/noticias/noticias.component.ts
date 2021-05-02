import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  @Input() noticias: Article[] = [];
  @Input() enFavoritos = false; // por defecto es falso, deberá cambiar de valor solo en tab3

  constructor() { }

  ngOnInit() {}

}
