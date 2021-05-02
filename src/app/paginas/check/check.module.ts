import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckPageRoutingModule } from './check-routing.module';

import { CheckPage } from './check.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckPageRoutingModule,
    ComponentesModule
  ],
  declarations: [CheckPage]
})
export class CheckPageModule {}
