import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TabsPage } from './page/tabs/tabs.page';
import { HttpClient } from '@angular/common/http';




const firebaseConfig = {
  apiKey: "AIzaSyD0s_T2YLY3ZkWvy6MlRIR8gLJnxY6YwhU",
  authDomain: "chat-e5862.firebaseapp.com",
  databaseURL: "https://chat-e5862.firebaseio.com",
  projectId: "chat-e5862",
  storageBucket: "",
  messagingSenderId: "93841602381",
  appId: "1:93841602381:web:d92d111b15947a6d"
};

@NgModule({
  declarations: [AppComponent,TabsPage],
  entryComponents: [],

  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireAuthModule, AngularFirestoreModule ,AngularFireModule.initializeApp(firebaseConfig) ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
