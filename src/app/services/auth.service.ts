import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})


export class AuthService {
  main: any;

  

  constructor() { }

  
  // const avatarURL = "http://127.0.0.1:3000/uploads/avatar.png";

  public async updateUserAvatar(userData: any): Promise<any>{
    const userId = userData.userId;
    const avatarURL = userData.avatarURL;
    return this.main.updateUser({id:userId, avatarURL:avatarURL});
  }


}
