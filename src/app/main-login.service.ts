import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { User } from "./user";
@Injectable()
export class MainLoginService {

  private loggedAnnouncedSource = new Subject<User>()
  private loggedConfirmedSource = new Subject<User>()
  loggedAnnounced$ = this.loggedAnnouncedSource.asObservable();
  loggedConfirmed$ = this.loggedConfirmedSource.asObservable();

  constructor() { }
  announceLogged(user:User){
    this.loggedAnnouncedSource.next(user)
  }
  confirmLogged(){
    
  }

}
