import { Injectable } from '@angular/core';
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Project } from "./project";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { of } from "rxjs/observable/of";
import { MessageService } from "./message.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormField } from "@angular/material";
import{Share} from "./share"
@Injectable()
export class ShareService {

  private shares: Share[];
  private taskListsUrl:string;
  constructor( private http: HttpClient,
    private messageService: MessageService) { }

    public getShares(projectId:string): Observable<any> {
      const url =`http://localhost:3000/projects/${projectId}/shares`
      return this.http
        .get<any>(url, httpOptions)
        .pipe(
          tap(projectes => this.log(`fetched shares`)),
          catchError(this.handleError("getShares", []))
        );
    }
    getShare(id: string): Observable<Share> {
      // Todo: send the message _after_ fetching the project
      const url = `${this.taskListsUrl}/${id}`;
      return this.http
        .get<Share>(url, httpOptions)
        .pipe(
          tap(_ => this.log(`fetched project id=${id}`)),
          catchError(this.handleError<Share>(`getProject id=${id}`))
        );
    }
    addShare(share: Share): Observable<Share> {
      return this.http
        .post<Share>(`http://localhost:3000/projects/${share.project_id}/shares`, share, httpOptions)
        .pipe(
          tap((taskList: any) => this.log(`added taskList w/ id=`)),
          catchError(this.handleError<any>("addTaskList"))
        );
    }

    updateShare(share: Share): Observable<boolean> {
      
      let id = new ObjectId()
      id  = JSON.parse(JSON.stringify(share._id))
      const updateUrl = `http://localhost:3000/shares/${id.$oid}`;
      return this.http
        .put(updateUrl, share, httpOptions)
        .pipe(
          tap(_ => this.log(`updated project id=${share._id}`)),
          catchError(this.handleError<any>("updateProject"))
        );
    }
   
    deleteShare(share: Share): Observable<boolean> {
      let id = new ObjectId()
      id  = JSON.parse(JSON.stringify(share._id))
      // let projectId = new ObjectId()
      // projectId = JSON.parse(JSON.stringify(taskList.project_id))
      const deleteUrl = `http://localhost:3000/shares/${id.$oid}`;
      return this.http
        .delete<Project>(deleteUrl, httpOptions)
        .pipe(
          tap(_ => this.log(`deleted project id=`)),
          catchError(this.handleError<any>("deleteproject"))
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
      this.messageService.add("projectService: " + message);
    }
}
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  withCredentials: true
};
export class ObjectId{
  $oid:string;
//   constructor(idStr: string) {
//     this.$oid = idStr;
// }
}
