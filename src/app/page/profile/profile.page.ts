import { Component, OnInit } from '@angular/core';
import {finalize} from 'rxjs/operators';
import {  AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
// 
  User = {
    name: " ",
    username: " ",
    displayName: " ",
    gender: " ",
    age: " "
  }
  post = {} as Post;
  userList;

 ref;
 task: any;
 uploadState: any;
 uploadProgress: any;
 downloadURL: any;


id;
name;


url
user: AngularFirestoreDocument;
sub;
photoURL:any;
  
 

 constructor(public Storage: AngularFireStorage , private  af: AngularFireAuth, private afs :AngularFirestore, private router: Router,private userServ: UserService) {
   
   this.af.auth.currentUser.photoURL;
   this.name=af.auth.currentUser.displayName;
  
   this.user=afs.doc(`users/${this.af.auth.currentUser.uid}`)
   this.sub=this.user.valueChanges().subscribe(event=>{
   this.photoURL = event.photoURL
   })

//
   const key = this.af.auth.currentUser.uid;
    
   this.userServ.getUser(key).subscribe( data =>{
     this.userList = data;
     console.log(data)
   })
 }
 ngOnInit() {
  const key = this.af.auth.currentUser.uid;
 }


//

// name: userList.name, username: userList.username,

 onEdit(userList){
  this.router.navigate(['/update'], {queryParams:{ gender: userList.gender, displayName: userList.displayName, age: userList.age}})
}
Onpost(post:Post){

  const key = this.af.auth.currentUser.uid;

  return 
  
}


 upload(event) {
   const file= event.target.files[0];
    this.id = Math.random().toString(36).substring(2);
   const filepath=this.id;
   this.ref = this.Storage.ref(filepath);
   const task = this.Storage.upload(filepath, file);
   this.uploadState = task.percentageChanges();
   task.snapshotChanges().pipe(
     finalize(() => {
       this.downloadURL = this.ref.getDownloadURL().subscribe(url=>{
         console.log(url);
         this.af.auth.currentUser.updateProfile({
           photoURL: url
         })
         this.user.update({
           photoURL: url
         })
       })
     })
   ).subscribe();
 }

 async logout(){
  await this.af.auth.signOut();
  return this.router.navigate(['/']);
}
}
