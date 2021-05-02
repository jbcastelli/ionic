import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // plugin local storage
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular'; // componente toast-controller

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  private _storage: Storage | null = null; // github 1. definir  _storage de tipo Storage

  noticias: Article[] = [];

  constructor(
    private storage: Storage, // inyectamos el servicio
    private toastController: ToastController
    ) { // inyectamos el servicio

    this.init(); // github 3. inicializar el local storage

    // la función cargarFavoritos debería ser llamada cuando la app necesite el servicio 'Storage', es decir en estos 2 casos:
    // 1. cuando se necesite insertar favoritos
    // 2. cuando queramos cargar la página favoritos

    this.cargarFavoritos();
  }

  async init() { // github 2. función para inicializar el local storage
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async presentToast( message: string ) { // mostrar mensaje toast
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async guardarNoticia( noticia: Article ){
    // guarda la noticia en el local storage

    const existe = this.noticias.find( noti => noti.title === noticia.title );
    // find devuelve el primer elemento buscado en el arreglo, caso contrario devuelve undefined,
    // es decir la constante existe almacenará la noticia encontrada

    if ( !existe ) { // añado a favoritos solamente si no existe una noticia igual
      this.noticias.unshift( noticia ); // unshift inserta al inicio del arreglo
      await this.storage.set('Favoritos', this.noticias); // almacenar en el local storage, el formato es (key, value)
    }

    this.presentToast('Añadido a Favoritos'); // mostrar mensaje/toast
  }

  async borrarNoticia( noticia: Article ) {
    // elimina la noticia del arreglo de favoritos

    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    // filter devuelve un nuevo arreglo sin el título de la noticia a borrar (parámetro noticia: Article)
    await this.storage.set('Favoritos', this.noticias); // almacenar en el local storage, el formato es (key, value)

    this.presentToast('Borrado de Favoritos'); // mostrar mensaje/toast
  }

  async cargarFavoritos(){
    // lee el local storage y por ahora lo muestra en consola

    // storage.get tiene como parámetro la clave de almacenamiento ('Favoritos') y devuelve en una promesa
    // el/los objeto(s) encontrados y los almacena en la constante "favoritos"
    const favoritos = await this.storage.get('Favoritos');
    console.log('cargarFavoritos : ', favoritos);

    if (favoritos) { // valido si hay contenido en mi local storage antes de cargar, para evitar el error del NULL
      // almacenar en el arreglo noticias el resultado de la lectura del local storage
      this.noticias = favoritos;
    }

  }

}
