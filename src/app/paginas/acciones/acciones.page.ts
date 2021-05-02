import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular'; // asegurar esta importación

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.page.html',
  styleUrls: ['./acciones.page.scss'],
})
export class AccionesPage implements OnInit {

  constructor( private actionSheetController: ActionSheetController) { }// se inyecta el servicio

  ngOnInit() {
  }

  onClick(){
    this.presentActionSheet();
  }

    // Aquí se crea un método asíncrono usando async/await
   async presentActionSheet() { // se crea asíncrono porque puede tardar su ejecución
    const actionSheet = await this.actionSheetController.create({
      header: 'Albumes',
      // presiono ctrl + barra espaciadora para mostrar todas las propiedades
      backdropDismiss : false,
      //cssClass: 'my-custom-class', // clase personalizada
      buttons: [{
        text: 'Delete',
        role: 'destructive', // en iOS aparecerá en rojo
        icon: 'trash-outline',
        cssClass: 'rojo', // clase personalizada
        handler: () => {
          console.log('Delete clicked'); // el handler hace el call-back para cada botón
        }
      }, {
        text: 'Share',
        icon: 'share-outline',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle-outline',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart-outline',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close-outline',
        role: 'cancel', // cierra el Action Sheet
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}
