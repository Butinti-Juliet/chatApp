import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  user = {} as User;

  User = {
    name:'',
    username: '',
    gender:'',
    age: ''
    
  };

  constructor(private route: ActivatedRoute, 
    private userServ: UserService, 
    private router: Router,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => { console.log(params);
      this.User.name = params.name,
      this.User.username = params.username,
      this.User.gender = params.gender
      this.User.age = params.age
    
        console.log(this.User.name, this.User.username, this.User.gender, this.User.age)
    });
  }
  onEdit(User){

    const key = this.afAuth.auth.currentUser.uid;

    this.userServ.update(User, User.key);
    alert('profile updated')
    this.router.navigateByUrl('profile')
  }
}

