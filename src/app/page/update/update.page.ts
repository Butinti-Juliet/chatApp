import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/module/user';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {



  User = {
    name:'',
    username: '',
    displayName: '',
    gender:'',
    age: '',
 
    
  };

  user = {} as User;



  constructor(private route: ActivatedRoute, 
    private userServ: UserService, 
    private router: Router,
    private afAuth: AngularFireAuth,
    private angularfire:AngularFirestore    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => { console.log(params);
      // this.User.name = params.name,
      // this.User.username = params.username,
      this.User.gender = params.gender,
      this.User.displayName = params.displayName
      this.User.age = params.age
    
        console.log(this.User.name, this.User.username, this.User.gender, this.User.age, this.User.displayName)
    })

    
  }
  onEdit(User){

    const key = this.afAuth.auth.currentUser.uid;

    this.userServ.update(User, key);
    alert('profile updated')
    this.router.navigateByUrl('profile')
  }

//   onEdit2(User)
// {

//   this.angularfire
//   .collection("users")
//   .doc(User.payload.doc.id)
//   .set({ displayName: User.displayName }, {  });

// }


 
}

