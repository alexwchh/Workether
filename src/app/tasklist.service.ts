import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Project } from "./project";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { of } from "rxjs/observable/of";
import { MessageService } from "./message.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormField } from "@angular/material";
import{TaskList} from "./task-list"
@Injectable()
export class TasklistService {
  private taskLists: TaskList[];
  private taskListsUrl:string;
  constructor( private http: HttpClient,
    private messageService: MessageService) { }

    public getTaskLists(projectId:string): Observable<any> {
      const url =`http://localhost:3000/projects/${projectId}/task_lists`
      return this.http
        .get<any>(url, httpOptions)
        .pipe(
          tap(projectes => this.log(`fetched tasklists`)),
          catchError(this.handleError("getTaskLists", []))
        );
    }
    getTaskList(id: string): Observable<TaskList> {
      // Todo: send the message _after_ fetching the project
      const url = `${this.taskListsUrl}/${id}`;
      return this.http
        .get<TaskList>(url, httpOptions)
        .pipe(
          tap(_ => this.log(`fetched project id=${id}`)),
          catchError(this.handleError<TaskList>(`getProject id=${id}`))
        );
    }
    addTaskList(taskList: TaskList): Observable<TaskList> {
      return this.http
        .post<TaskList>(`http://localhost:3000/projects/${taskList.project_id}/task_lists`, taskList, httpOptions)
        .pipe(
          tap((taskList: any) => this.log(`added taskList w/ id=`)),
          catchError(this.handleError<any>("addTaskList"))
        );
    }

    updateTaskList(tasklist: TaskList): Observable<boolean> {
      
      let id = new ObjectId()
      id  = JSON.parse(JSON.stringify(tasklist._id))
      const updateUrl = `http://localhost:3000/task_lists/${id.$oid}`;
      return this.http
        .put(updateUrl, tasklist, httpOptions)
        .pipe(
          tap(_ => this.log(`updated project id=${tasklist._id}`)),
          catchError(this.handleError<any>("updateProject"))
        );
    }
    updateTaskListOrder(tasklists:TaskList[]){
      const updateUrl = `http://localhost:3000/update_order`;
      return this.http
      .put(updateUrl, tasklists, httpOptions)
      .pipe(
        tap(_ => this.log(`updated project id=`)),
        catchError(this.handleError<any>("updateProject"))
      );
    }
    deleteTaskList(taskList: TaskList): Observable<boolean> {
      let id = new ObjectId()
      id  = JSON.parse(JSON.stringify(taskList._id))
      // let projectId = new ObjectId()
      // projectId = JSON.parse(JSON.stringify(taskList.project_id))
      const deleteUrl = `http://localhost:3000/task_lists/${id.$oid}`;
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
export class TaskOrder{
  id:any;
  order:number;
//   constructor(idStr: string) {
//     this.$oid = idStr;
// }
}