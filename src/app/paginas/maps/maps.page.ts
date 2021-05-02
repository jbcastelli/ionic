import { Component, OnInit } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  lat: number;
  lng: number;

  constructor( private geolocation: Geolocation ) { }

  getGeo(){
    // obtener la geolocalización
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      // recupero las coordenadas en el arreglo 'coordenadas'
      const coordenadas = `${ resp.coords.latitude },${ resp.coords.longitude }`;

      // hago el split y lo convierto a número
      const latLng = coordenadas.split(',');
      this.lat = Number(latLng[0]);
      this.lng = Number(latLng[1]);

      console.log('Latitud: ', this.lat, ' Longitud: ', this.lng);

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  ngOnInit() {
    this.getGeo();
  }
}
