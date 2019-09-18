import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
uid:any;
users:any;
 constructor(public nav:NavController, public user:UserService,public af:AngularFireAuth,public firebase:AngularFirestore,private route: Router) {
       this.users=firebase.collection('users').valueChanges();
       this.uid=af.auth.currentUser.uid;
 }
 ngOnInit() {
 }
 message(key){
   this.route.navigate(['/profile-pic'] ,{ queryParams :{displayName: key.displayName , userid: key.uid}})
 }
 
}
