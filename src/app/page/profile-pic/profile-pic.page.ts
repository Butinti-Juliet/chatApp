import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';



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


  constructor(private storage: AngularFireStorage,private router: Router, private af: AngularFireAuth, private firebase: AngularFirestore, private route: ActivatedRoute) { 
   
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

  ngOnInit() {
    
   
  }

}
