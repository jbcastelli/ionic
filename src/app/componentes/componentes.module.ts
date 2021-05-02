import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaDetalleComponent } from './noticia-detalle/noticia-detalle.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NoticiasComponent,
    NoticiaDetalleComponent
  ],
  exports:[
    HeaderComponent,
    NoticiasComponent
    // no exporto NoticiaDetalleComponent, porque este componente dependerá de NoticiasComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentesModule { }
