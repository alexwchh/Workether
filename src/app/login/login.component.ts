import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { UserService } from "../user.service";
import { User } from '../user';
import { Router} from '@angular/router';
import { MainLoginService } from "../main-login.service";
import { CookieService } from 'ngx-cookie-service';
import {  ObjectId} from "../project.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isSignin:boolean;
  public isLogin:boolean;
  newAccount:string;
  newPsw:string;
  newName:string;
 
  public signedUser:User
  public isSuccess:boolean
 
  constructor(
  private userService:UserService,
  private router:Router,
  private mainLoginService:MainLoginService,
  private cookieService: CookieService)
  {

  mainLoginService.loggedConfirmed$.subscribe(
    
  )
   }
   
  ngOnInit() {
    this.isLogin=true;
    this.isSignin=false;
  }
  loginToggle():void{
    this.isLogin=!this.isLogin;
    this.isSignin=!this.isSignin;
  }
  logIn():void{
    let newUser = new User(this.newAccount,this.newPsw);
    this.userService.login(newUser).subscribe(
      user=>{
       this.signedUser=user.user;
       this.isSuccess = user.isSuccess;
       console.log(user.isSuccess);
       if (this.isSuccess){
         this.mainLoginService.announceLogged(user.user)
          this.router.navigateByUrl('/projects')
        let id = new ObjectId();
        id  = JSON.parse(JSON.stringify(this.signedUser._id))
          this.cookieService.set("current_user_id",id.$oid)
        } 
     })
  }
  signUp():void{

     let newUser = new User(this.newAccount,this.newPsw);
     newUser.name = this.newName;
     this.userService.addUser(newUser).subscribe(
       user=>{
        this.signedUser=user.user;
        this.isSuccess = user.isSuccess;
        console.log(user.isSuccess);
        if (this.isSuccess){
          this.mainLoginService.announceLogged(user.user)
           this.router.navigateByUrl('/projects')
           let id = new ObjectId();
        id  = JSON.parse(JSON.stringify(this.signedUser._id))
          this.cookieService.set("current_user_id",id.$oid)
           console.log(id.$oid)
         } 
      })
  }
  onLogin(){

  }
}
export class UserOperation{
   isSuccess:boolean;
   user:User

}