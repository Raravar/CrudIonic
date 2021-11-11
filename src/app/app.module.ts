import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import {DataBaseService} from './servicios/data-base.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),AppRoutingModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,BrowserAnimationsModule],
  providers: [
    NativeStorage,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    SQLitePorter,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 constructor(db: DataBaseService){}
}