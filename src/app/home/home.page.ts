import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string;
  password: string;
  
  constructor(public fs:AngularFirestore, public af: AngularFireAuth,public nav:NavController) { }

   login(){
     this.af.auth.signInWithEmailAndPassword(this.email,this.password).then(()=>{
      //  this.nav.navigateRoot('main')
      this.nav.navigateRoot('tabs')
     }).catch(err=>{
       alert(err.message)
     })
   }
   signUp(){
     this.nav.navigateForward('signup');
   }

   anonymous() {
    this.af.auth.signInAnonymously().then(() => {
      localStorage.setItem('userid', this.af.auth.currentUser.uid);
      this.nav.navigateRoot('/tabs');
    }).catch(err => {
      alert(err.message);
    });
   }
}
