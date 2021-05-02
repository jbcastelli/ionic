import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Componentes, RespuestaTopHeadLines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiURL = environment.apiURL;

const headers = new HttpHeaders({
  'X-Api-key' : apiKey
});

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }

  // esta función me permite construir el URL en base a la "información común" + "el api key" + "la categoría"
  private ejecutarQuery<T>( query: string ) { // este tipado <T> se conoce como genéricos (recibimos un tipo de datos)

    query = apiURL + query;

    return this.http.get<T>( query, { headers } ); // incluimos el apiKey como parámetro de método HTTP
    // y retornamos un tipo de datos <T>
  }

  getUsuarios() { // este es un observable que retorna un objeto
    return this.http.get("https://jsonplaceholder.typicode.com/users");
  }

  getAlbumes() { // este es un observable que retorna un objeto
    return this.http.get("https://jsonplaceholder.typicode.com/albums");
  }

  getMenuOpciones() { // este es un observable que retorna un objeto
    return this.http.get<Componentes[]>("/assets/data/menu-opciones.json");
  }

  // getNoticias() { // este es un observable que retorna un objeto
  //   return this.http.get<RespuestaTopHeadLines>("https://newsapi.org/v2/top-headlines?apiKey=5fa9a4c793284fef928209cedb8d8e4c&country=us");
  // }

  getNoticias() {
    // llamamos a la función ejecutarQuery con el parámetro específico de esta consulta, usar back piks
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us`);
  }

  // getNoticiasCategoria() { // este es un observable que retorna un objeto
  //   return this.http.get<RespuestaTopHeadLines>("https://newsapi.org/v2/top-headlines?apiKey=5fa9a4c793284fef928209cedb8d8e4c&country=us&category=business");
  // }


  getNoticiasCategoria( categoria: string ) {
    // llamamos a la función ejecutarQuery con el parámetro específico de esta consulta además de la categoría
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${ categoria }`);
  }

}
