import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  isLoggedIn(): boolean {
    throw new Error("Method not implemented.");
  }
 

  constructor(private afAuth: AngularFireAuth, private nav: NavController) { 

    afAuth.auth.onAuthStateChanged((user)=>{
      if(user){
        this.nav.navigateRoot("tabs/user");
      }else{
        this.nav.navigateRoot("");
      }
    })

  }
}
