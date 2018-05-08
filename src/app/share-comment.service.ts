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
import{Task} from "./task"

import { ShareComment } from "./share_comment";
@Injectable()
export class ShareCommentService {

  constructor(private http: HttpClient,
    private messageService: MessageService) { }
  public getComments(shareId:string): Observable<ShareComment[]> {
    const url =`http://localhost:3000/shares/${shareId}/share_comments`
    return this.http
      .get<ShareComment[]>(url, httpOptions)
      .pipe(
        tap(projectes => this.log(`fetched tasklists`)),
        catchError(this.handleError("getTaskLists", []))
      );
  }
  addComment(commentItem: ShareComment): Observable<ShareComment> {
    return this.http
      .post<ShareComment>(`http://localhost:3000/shares/${commentItem.share_id}/share_comments`, commentItem, httpOptions)
      .pipe(
        tap((tag: any) => this.log(`added taskList w/ id=`)),
        catchError(this.handleError<any>("addTaskList"))
      );
  }
  deleteTask(commentItem: ShareComment): Observable<boolean> {
    let id = new ObjectId()
    id  = JSON.parse(JSON.stringify(commentItem._id))
    // let projectId = new ObjectId()
    // projectId = JSON.parse(JSON.stringify(taskList.project_id))
    const deleteUrl = `http://localhost:3000/share_comments/${id.$oid}`;
    return this.http
      .delete<ShareComment>(deleteUrl, httpOptions)
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
