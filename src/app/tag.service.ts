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
import{Tag} from "./tag"
@Injectable()
export class TagService {

  constructor(private http: HttpClient,
    private messageService: MessageService) { }
  public getTags(taskId:string): Observable<Tag[]> {
    const url =`http://localhost:3000/tasks/${taskId}/tags`
    return this.http
      .get<Tag[]>(url, httpOptions)
      .pipe(
        tap(projectes => this.log(`fetched tasklists`)),
        catchError(this.handleError("getTaskLists", []))
      );
  }
  addTask(tagItem: Tag): Observable<Tag> {
    return this.http
      .post<Tag>(`http://localhost:3000/tasks/${tagItem.task_id}/tags`, tagItem, httpOptions)
      .pipe(
        tap((tag: any) => this.log(`added taskList w/ id=`)),
        catchError(this.handleError<any>("addTaskList"))
      );
  }
  deleteTask(tagItem: Tag): Observable<boolean> {
    let id = new ObjectId()
    id  = JSON.parse(JSON.stringify(tagItem._id))
    // let projectId = new ObjectId()
    // projectId = JSON.parse(JSON.stringify(taskList.project_id))
    const deleteUrl = `http://localhost:3000/tags/${id.$oid}`;
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