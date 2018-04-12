import { Component ,ViewChild} from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import 'hammerjs';
import { User } from './user';
import { MainLoginService } from "./main-login.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private user:User
  constructor(
    activatedRoute:ActivatedRoute,
    mainLoginService:MainLoginService
  ){
      mainLoginService.loggedAnnounced$.subscribe(user=>{
        this.user=user,
        console.log("this is user confirmed info")
      })
  }
  title = 'Workether';
  public loggedUser:User
}
