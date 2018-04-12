import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { UserService } from "../user.service";
import { User } from '../user';
import { Router} from '@angular/router';
import { MainLoginService } from "../main-login.service";
import { CookieService } from 'ngx-cookie-service';
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
  signinAccount:string;
  singinPsw:string;
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
        
          this.cookieService.set("test",user.user._id)
        } 
     })
  }
  signUp():void{

     let newUser = new User(this.newAccount,this.newPsw);
     this.userService.addUser(newUser).subscribe(
       user=>{
        this.signedUser=user.user;
        this.isSuccess = user.isSuccess;
        console.log(user.isSuccess);
        if (this.isSuccess){
          this.mainLoginService.announceLogged(user.user)
           this.router.navigateByUrl('/projects')
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