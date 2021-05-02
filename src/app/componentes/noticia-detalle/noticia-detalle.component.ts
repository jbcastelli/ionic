import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'; // importamos el plugin
import { ActionSheetController } from '@ionic/angular'; // action-sheet
import { SocialSharing } from '@ionic-native/social-sharing/ngx'; // importamos el plugin
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-noticia-detalle',
  templateUrl: './noticia-detalle.component.html',
  styleUrls: ['./noticia-detalle.component.scss'],
})
export class NoticiaDetalleComponent implements OnInit {

  @Input() noticia: Article;
  @Input() i: number;
  @Input() enFavoritos; // no hace falta inicializar, ya que el valor y el tipado vendrán desde el componente padre (noticias.component)

  constructor(
    private iab: InAppBrowser, // inyectamos el servicio del plugin
    private actionSheetController: ActionSheetController, // inyectamos el servicio del action-sheet
    private socialSharing: SocialSharing, // inyectamos el servicio del plugin
    private localDataService: LocalDataService // inyectamos el data service local
    ) { }

  ngOnInit() {}

  abrirNoticia() {
    console.log('URL', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system'); // usamos el plugin
    // el parámetro '_system' especifica el browser por default del dispositivo donde se ejecute mi app
  }

  async mostrarMenu() {
    let guardarBorarBoton; // almacena el contenido dinámico de añadir/borrar favorito

    if (this.enFavoritos) {
      // borrar de favoritos
      guardarBorarBoton = {
        text: 'Borrar Favorito',
        icon: 'trash-outline',
        handler: () => {
          console.log('Borrar de Favorito');
          this.localDataService.borrarNoticia( this.noticia ); // método en localDataService
        }
      };
    } else {
      // añadir a favoritos
      guardarBorarBoton = {
        text: 'Favorito',
        icon: 'star-outline',
        handler: () => {
          console.log('Favorito');
          this.localDataService.guardarNoticia( this.noticia ); // método en localDataService
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [
      {
        text: 'Compartir',
        icon: 'share-outline',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      guardarBorarBoton, // contenido dinámico de añadir/borrar favorito
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    });
    await actionSheet.present();
  }

}

