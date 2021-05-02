import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {

  datos=[
    {
      color: 'primary',
      estado: false
    },
    {
      color: 'secondary',
      estado: true
    },
    {
      color: 'tertiary',
      estado: false
    },
    {
      color: 'warning',
      estado: true
    },
    {
      color: 'success',
      estado: false
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  onClick( item: any ) {
    console.log(item);
  }

  verDatos() {
    console.log(this.datos);
    console.log(JSON.stringify(this.datos) );
  }

}
