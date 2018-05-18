import { Injectable } from '@angular/core';
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./user";
import {UserOperation} from './login/login.component'
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import {MessageService} from "./message.service"
import {  ObjectId} from "./project.service";
@Injectable()
@Injectable()
export class UserService {
  private usersUrl = "http://localhost:3000/users";
  private loginUrl = "http://localhost:3000/login";
  private users:User[]
  constructor(private http: HttpClient,private messageService:MessageService) {}
 
  public getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(
        tap(useres => this.log(`fetched useres`)),
        catchError(this.handleError("getUseres", []))
      );
  }

  getUserById(id: number): Observable<User> {
    // Todo: send the message _after_ fetching the user
    const url = `${this.usersUrl}/${id}`;
    return this.http
      .get<User>(url)
      .pipe(
        tap(_ => this.log(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }
  
  login(user:User): Observable<UserOperation> {
    // Todo: send the message _after_ fetching the user
    const url = `${this.loginUrl}`;
    return this.http.post<UserOperation>(this.loginUrl, user, httpOptions).pipe(
      tap((user: UserOperation) => this.log(`added user w/ id=${user.isSuccess}`)),
      catchError(this.handleError<UserOperation>('addUser'))
    );
  }
  addUser (user: User): Observable<UserOperation> {
    return this.http.post<UserOperation>(this.usersUrl, user, httpOptions).pipe(
      tap((user: UserOperation) => this.log(`added user w/ id=${user.isSuccess}`)),
      catchError(this.handleError<UserOperation>('addUser'))
    );
  }
  updateUser (user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user._id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user._id;
    const url = `${this.usersUrl}/${id}`;
  
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteuser'))
    );
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add("userService: " + message);
  }
  
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials:true
};