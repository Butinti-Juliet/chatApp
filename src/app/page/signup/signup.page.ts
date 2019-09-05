import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {


  email:string;
  pwd:string;
  username:string;
 

  constructor(public nav: NavController, public af: AngularFireAuth,public fs: AngularFirestore ) { }


  ngOnInit() {
  }
  signup(){
    this.af.auth.createUserWithEmailAndPassword(this.email, this.pwd).then(() => {
    
      localStorage.setItem('userid', this.af.auth.currentUser.uid);
      this.af.auth.currentUser.updateProfile({
        displayName: this.username,
        photoURL: ''
      }).then(()=>{
        // this.nav.navigateRoot('/main');
        this.nav.navigateRoot('/tabs');
      }).catch(err => {
        alert(err.message)
      })
    
    }).catch(err => {
      alert(err.message)
    })
  
}

home(){
   this.nav.navigateForward('/home');
  
}



}
