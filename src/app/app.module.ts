import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { IonicStorageModule } from '@ionic/storage-angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,                // importamos el HttpClientModule
    IonicStorageModule.forRoot()     // importamos el IonicStorageModule
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      InAppBrowser, // declaramos el InAppBrowser
      SocialSharing, // declaramos el SocialSharing
      OneSignal,     // declaramos el OneSignal
      Geolocation], // declaramos el Geolocation
  bootstrap: [AppComponent],
})
export class AppModule {}
