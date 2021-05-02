import { Component, OnInit } from '@angular/core';
import { LocalDataService } from 'src/app/services/local-data.service';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  constructor( public localDataService: LocalDataService ) { } // inyectamos el local-data.service
  // definimos la propiedad public, para poder utilizar el localDataService en tab3.page.html

  ngOnInit() {
  }

}
