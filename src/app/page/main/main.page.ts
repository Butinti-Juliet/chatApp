import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
 
text: string;
chatRef: any;
uid: string;
  ref;
  id: string;
  uploadState: any;
  downloadURL;


  constructor(public af: AngularFireAuth, public fs: AngularFirestore,private storage: AngularFireStorage,private firebase: AngularFirestore,private camera: Camera) {
    // this.uid = localStorage.getItem('userid');
    this.uid=this.af.auth.currentUser.uid;
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
    // Timestamp : Date.now(),
  });
  this.text='';
}
}

upload(event) {
  const file= event.target.files[0];
 this.id = Math.random().toString(36).substring(2);
const filepath=this.id;
this.ref = this.storage.ref(filepath);
const task = this.storage.upload(filepath, file);
this.uploadState = task.percentageChanges();
task.snapshotChanges().pipe(
  finalize(() => {
    this.downloadURL = this.ref.getDownloadURL().subscribe(url=>{
       console.log(url);
      this.firebase.collection('chat').add({
        Name: this.af.auth.currentUser.displayName,
        photoURL:url,
        UserID: this.af.auth.currentUser.uid,
        // sendTo:this.sendto,
        Message: this.text,
        Timestamp:firebase.firestore.FieldValue.serverTimestamp(),    
        });
     })
   })
 ).subscribe();

}

takePhoto() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   let base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
  });
}

  ngOnInit() {
  }

}
