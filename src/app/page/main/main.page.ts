import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
 
text: string;
chatRef: any;
uid: string;


  constructor(public af: AngularFireAuth, public fs: AngularFirestore) {
    this.uid = localStorage.getItem('userid');
    this.chatRef = this.fs.collection('chat',ref=>ref.orderBy('Timestamp')).valueChanges();
  console.log(this.uid)
  }


  

send(){
if(this.text != ''){
  this.fs.collection('chat').add({
    Name: this.af.auth.currentUser.displayName,
    Message: this.text,
    UserID: this.af.auth.currentUser.uid,
    Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
  });
  this.text='';
}
}

  ngOnInit() {
  }

}
