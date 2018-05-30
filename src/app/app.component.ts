import { Component ,ViewChild} from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import 'hammerjs';
import { User } from './user';
import { MainLoginService } from "./main-login.service";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private user:User
  constructor(
    activatedRoute:ActivatedRoute,
    mainLoginService:MainLoginService,
    private translate: TranslateService
  ){
      mainLoginService.loggedAnnounced$.subscribe(user=>{
        this.user=user,
        console.log("this is user confirmed info")
      // this language will be used as a fallback when a translation isn't found in the current language
    //   this.translate.setDefaultLang('en');
    //   this.translate.addLangs(['en', 'es']);

    //   // the lang to use, if the lang isn't available, it will use the current loader to get them
    //  this.translate.use('en');
      });
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('en');
      this.translate.addLangs(['en', 'ch']);

      // the lang to use, if the lang isn't available, it will use the current loader to get them
     this.translate.use('ch');
  }
  title = 'Workether';
  public loggedUser:User
}
