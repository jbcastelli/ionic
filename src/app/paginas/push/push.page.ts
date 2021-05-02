import { ApplicationRef, Component, OnInit } from '@angular/core';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';

import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-push',
  templateUrl: './push.page.html',
  styleUrls: ['./push.page.scss'],
})
export class PushPage implements OnInit {

  mensajes: OSNotificationPayload[] = []; // arreglo de mensajes de tipo payload

  constructor(
    public pushService: PushService, // public o private
    private applicationRef: ApplicationRef ) {}
    // ApplicationRef contiene el método para disparar el ciclo de detección de cambios de angular

    ngOnInit() {
      this.pushService.pushListener.subscribe( noti => { // me subscribo al observable/listener
        // e inserto las notificaciones en el arreglo de mensajes uso unshift
        this.mensajes.unshift( noti );
        this.applicationRef.tick(); // si no detecta los cambios el observer/listener,
        // puedo disparar el ciclo de detección de cambios usando el método tick
      });
    }

    async ionViewWillEnter() {
      // escucho el evento ionViewWillEnter por si la app se encuentra cerrada o en suspenso, en cualquier caso cargar las
      // notificaciones del arreglo mensajes

      console.log('Estoy en ionViewWillEnter - Cargar mensajes');

      // this.userId = await this.pushService.getUserIdOneSignal(); // aún no lo utilizo en esta versión

      // cargo el arreglo mensajes
      this.mensajes = await this.pushService.getMensajes();
    }

    async borrarMensajes(){
      // invoco al método de borrar mensajes del local storage desde mi servicio pushService
      await this.pushService.borrarMensajes();

      // inicializo mi arreglo de mensajes (de tipo payload)
      this.mensajes = [];
    }
}
