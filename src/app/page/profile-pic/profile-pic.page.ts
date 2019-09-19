import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.page.html',
  styleUrls: ['./profile-pic.page.scss'],
})
export class ProfilePicPage implements OnInit {

  text: string;
  chatRef: any;
  uid: string;
  user: any;
  sendto;
  userid
  displayName;
  ref;
  downloadURL;
  uploadState: any;
  id: any;


  constructor(private storage: AngularFireStorage,private camera: Camera,private router: Router, private af: AngularFireAuth, private firebase: AngularFirestore, private route: ActivatedRoute) { 
   
    this.uid=this.af.auth.currentUser.uid;
    this.chatRef = this.firebase.collection('chats', ref=>ref.orderBy('Timestamp')).valueChanges();
   


    this.route.queryParams
    .subscribe(params => {
      this.displayName=params.displayName;
      this.sendto=params.userid;
      console.log("user "+ this.sendto);
    });
  }

 


  send(){
    if(this.text != ''){
      this.firebase.collection('chats').add({
        displayName: this.displayName,
        message: this.text,
        userid: this.af.auth.currentUser.uid,
        sendTo: this.sendto,
        Timestamp: Date.now(),
      });
      this.text="";
    
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
        this.firebase.collection('chats').add({
          displayName: this.displayName,
          photoURL:url,
          userid:this.af.auth.currentUser.uid,
          sendTo:this.sendto,
          Timestamp: Date.now(),      
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
