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
import{Task} from "./task"
import {Subtask} from "./subtask";
@Injectable()
export class SubtaskService {
  private subtasks: Subtask[];
  private tasksUrl:string;
  constructor( private http: HttpClient,
    private messageService: MessageService) { }

    public getTasks(taskId:string): Observable<Subtask[]> {
      const url =`http://localhost:3000/tasks/${taskId}/subtasks`
      return this.http
        .get<Subtask[]>(url, httpOptions)
        .pipe(
          tap(projectes => this.log(`fetched tasklists`)),
          catchError(this.handleError("getTaskLists", []))
        );
    }

    addTask(taskItem: Subtask): Observable<Subtask> {
      return this.http
        .post<Subtask>(`http://localhost:3000/tasks/${taskItem.task_id}/subtasks`, taskItem, httpOptions)
        .pipe(
          tap((task: any) => this.log(`added taskList w/ id=`)),
          catchError(this.handleError<any>("addTaskList"))
        );
    }
    updateTask(taskItem: Subtask): Observable<boolean> {
      
      let id = new ObjectId()
      id  = JSON.parse(JSON.stringify(taskItem._id))
      const updateUrl = `http://localhost:3000/subtasks/${id.$oid}`;
      return this.http
        .put(updateUrl, taskItem, httpOptions)
        .pipe(
          tap(_ => this.log(`updated task id=${taskItem._id}`)),
          catchError(this.handleError<any>("updateTask"))
        );
    }

    updateTaskOrder(taskItems: Subtask[]){
      const updateUrl = `http://localhost:3000/subtasks_order`;
      return this.http
      .put(updateUrl, taskItems, httpOptions)
      .pipe(
        tap(_ => this.log(`updated taskItems id=`)),
        catchError(this.handleError<any>("update taskItems order"))
      );
    }
    updateTaskGroup(taskItems: Subtask[]){
      const updateUrl = `http://localhost:3000/complete_all_subtask`;
      return this.http
      .put(updateUrl, taskItems, httpOptions)
      .pipe(
        tap(_ => this.log(`updated taskItems id=`)),
        catchError(this.handleError<any>("update taskItems order"))
      );
    }
    deleteTask(taskItem: Subtask): Observable<boolean> {
      let id = new ObjectId()
      id  = JSON.parse(JSON.stringify(taskItem._id))
      // let projectId = new ObjectId()
      // projectId = JSON.parse(JSON.stringify(taskList.project_id))
      const deleteUrl = `http://localhost:3000/subtasks/${id.$oid}`;
      return this.http
        .delete<Subtask>(deleteUrl, httpOptions)
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