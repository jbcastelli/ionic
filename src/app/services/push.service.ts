import { EventEmitter, Injectable } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage'; // importamos el plugin

@Injectable({
  providedIn: 'root'
})
export class PushService {

  private _storage: Storage | null = null; // github 1. definir  _storage de tipo Storage

  mensajes: OSNotificationPayload[] = []; // no es de tipo OSNotification porque solo estoy almacenando el payload
  userId: string; // aquí almaceno el Id del dispositivo

  pushListener = new EventEmitter<OSNotificationPayload>(); // declaro mi observable/listener

  constructor(
      private oneSignal: OneSignal, // inyectamos el servicio de oneSignal
      private storage: Storage ) { // inyectamos el servicio del storage

      this.init(); // github 3. inicializar el local storage

      // llamo a mi método cargarMensajes para que el contenido esté disponible cuando inicie mi app
      this.cargarMensajes();
  }

  async init() { // github 2. función para inicializar el local storage
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getMensajes() {
    // lee los mensajes del local storage y los almacena en el arreglo mensajes
    await this.cargarMensajes();
    // return this.mensajes; // también se puede usar el return así, pero enviaría el arreglo como un solo objeto
    return [...this.mensajes]; // uso el operador spread (...)
    // para que todos los elementos del arreglo sean tratados como objetos independientes
  }

  configInicial(){
    this.oneSignal.startInit('ae31d2d3-ba16-4427-9ee7-3a0336420d24', '383212752479');
    // la primera clave corresponde al "ONESIGNAL APP ID" de la app creada en oneSignal ** Proyecto "Push Notifications" **
    // y la segunda clave corresponde al "ID del remitente" de la app creada en firebase ** Proyecto "Push-Notifications" **

    this.oneSignal.inFocusDisplaying( this.oneSignal.OSInFocusDisplayOption.Notification ); // la cambio a tipo Notification

    this.oneSignal.handleNotificationReceived().subscribe( ( noti ) => {
      // acciones cuando la notificación es recibida
      console.log('Notificación recibida', noti );

      // llamo al método que almacenará la notificación y el payload en el arreglo de mensajes
      this.notificacionRecibida( noti );
    });

    this.oneSignal.handleNotificationOpened().subscribe( async( noti ) => {
      // acciones cuando la notificación es abierta
      console.log('Notificación abierta', noti );

      // lamo al método notificacionRecibida para que también almacene en el arreglo mensajes el contenido de la notificación
      await this.notificacionRecibida( noti.notification );
    });

    this.oneSignal.getIds().then( info => {
      // obtener Id del suscriptor (Id del dispositivo)
      this.userId = info.userId;
      console.log('User Id: ', this.userId);
    });

    this.oneSignal.endInit();
  }

  async notificacionRecibida( noti: OSNotification ) {
    // método para cargar las notificaciones recibidas y el payload (datos adicionales)

    console.log('notificaciónRecibida');

    await this.cargarMensajes(); // cargo mensajes

    // cargo el payload
    const payload = noti.payload;

    // para no almacenar notificaciones duplicadas (cuando mi app se encuentra inactiva o cerrada)
    // valido si el ID de la notificación recibida ya existe en mi arreglo de mensajes
    const existePush = this.mensajes.find( mensaje => mensaje.notificationID === payload.notificationID );

    // si ya existe, no debo hacer nada (salir del método)
    if ( existePush ) {
      return;
    }

    // si NO existe la notificación, la añado de primero (unshift) en mi arreglo
    this.mensajes.unshift( payload );

    // llamo a mi listener después de recibir la notificación
    this.pushListener.emit( payload ); // me avisa que tengo nuevo contenido (una nueva notificación push)

    // llamo al método para almacenar en el local storage lo que se encuentra en el arreglo mensajes
    await this.guardarMensajes();
  }

  async guardarMensajes() {
    // almacena mensajes en el local storage
    await this.storage.set('Notificaciones', this.mensajes ); // el formato es (key, value)

    console.log('guardarMensajes', this.mensajes);
  }

  async cargarMensajes() {
    // leer del local storage y cargarlo en mensajes
    // para borrar "TODO" el local storage del dispositivo, descomentar la siguiente línea
    // this.storage.clear();
    this.mensajes =  await this.storage.get('Notificaciones') || [];
    // puede retornar null si está vacío el local storage, por eso uso el operador (OR) || [] que retorna un arreglo vacío

    console.log('cargarMensajes: ', this.mensajes);

    return this.mensajes;
  }

  async borrarMensajes(){
    // borra del local storage los registros cuya clave corresponden a 'Notificaciones'
    await this.storage.remove('Notificaciones');

    this.mensajes = []; // inicializo el arreglo de mensajes
    this.guardarMensajes(); // purgar mensajes
  }
}
