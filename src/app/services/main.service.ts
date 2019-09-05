import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  isLoggedIn(): boolean {
    throw new Error("Method not implemented.");
  }
  nav: any;

  constructor(private afAuth: AngularFireAuth) { 

    afAuth.auth.onAuthStateChanged((user)=>{
      if(user){
        this.nav.navigateRoot("tabs");
      }else{
        this.nav.navigateRoot("");
      }
    })

  }
}
