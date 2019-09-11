import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../module/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  private userDoc: AngularFirestoreDocument<User>;

  constructor(private angularfire:AngularFirestore) { }

  getUser(key)
  {
    // return this.angularfire.collection('users/'+ key).valueChanges();
    this.userDoc = this.angularfire.doc<User>('users/'+key);
    return this.userDoc.valueChanges();
  }

  update2(User, key)
  {
     this.angularfire.doc<User>('users/'+key);
    this.userDoc.update(User);
   
  }


  
}
