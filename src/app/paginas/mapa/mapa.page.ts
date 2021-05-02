import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any; // necesario para el evitar el error de TS, al no reconocer la librería global importada desde el CDN de mapBox

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  lat: number;
  lng: number;

  constructor( private ruta: ActivatedRoute ) { } // necesario para leer los parámetros pasados por la ruta del routerLink

  ngOnInit() {
    // implemento la lectura de los parámetros de la ruta
    this.lat = Number(this.ruta.snapshot.params.lat)
    this.lng = Number(this.ruta.snapshot.params.lng);

    console.log('Latitud: ', this.lat, ' Longitud: ', this.lng);
  }

  ngAfterViewInit() {
    // este método se ejecutará luego de que toda la vista ha sido inicializada y las librerías han sido cargadas

    mapboxgl.accessToken = 'pk.eyJ1IjoiamJjYXN0ZWxsaSIsImEiOiJja2xkN2owamczMmM3Mm5wZTRiMjJ4eHRhIn0.RCPtvJzHy2cHskdDmoGVNw';
    // el token corresponde al creado en mapBox.com

    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10', // nuevo estilo
      center: [this.lng, this.lat], // ubicación en el mapa
      zoom: 15.5, // zoom del mapa
      pitch: 45, // inclinación
      bearing: -17.6,
      container: 'map', // referencia al nombre del contenedor div en mapa.page.html
      antialias: true
      });

    // renderización de los edificios en 3D
    map.on('load', () => { // cambio la declaración function por () => para no tener problemas con la declaración this.

      map.resize(); // este método soluciona el problema de NO mostrarse en pantalla completa,
      // vuelve a tomar las dimensiones del contenedor y volver a renderizar el mapa

      // creamos un marker en las coordenadas del dispositivo
      new mapboxgl.Marker()
        .setLngLat([this.lng, this.lat]) // especifico las coordenadas en formato (longitud, latitud)
        .addTo(map); // añado el marker al contenedor div en mapa.page.html

      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
          'fill-extrusion-color': '#aaa',

          // Use an 'interpolate' expression to
          // add a smooth transition effect to
          // the buildings as the user zooms in.
          'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'height']
          ],
          'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
          }
      },

      labelLayerId
      );
    });
  }
}
