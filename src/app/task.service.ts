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
@Injectable()
export class TaskService {
  private taskItems: Task[];
  private tasksUrl:string;
  constructor( private http: HttpClient,
    private messageService: MessageService) { }

    public getTasks(taskListId:string): Observable<Task[]> {
      const url =`http://localhost:3000/task_lists/${taskListId}/tasks`
      return this.http
        .get<Task[]>(url, httpOptions)
        .pipe(
          tap(projectes => this.log(`fetched tasklists`)),
          catchError(this.handleError("getTaskLists", []))
        );
    }
    public getStatics(projectId:string): Observable<Task[]> {
      return this.http
        .get<Task[]>(`http://localhost:3000/projects/${projectId}/statics`, httpOptions)
        .pipe(
          tap(projectes => this.log(`fetched projectes`)),
          catchError(this.handleError("getProjectes", []))
        );
    }
    addTask(taskItem: Task): Observable<Task> {
      return this.http
        .post<Task>(`http://localhost:3000/task_lists/${taskItem.task_list_id}/tasks`, taskItem, httpOptions)
        .pipe(
          tap((task: any) => this.log(`added taskList w/ id=`)),
          catchError(this.handleError<any>("addTaskList"))
        );
    }
    updateTask(taskItem: Task): Observable<boolean> {
      
      let id = new ObjectId()
      id  = JSON.parse(JSON.stringify(taskItem._id))
      const updateUrl = `http://localhost:3000/tasks/${id.$oid}`;
      return this.http
        .put(updateUrl, taskItem, httpOptions)
        .pipe(
          tap(_ => this.log(`updated task id=${taskItem._id}`)),
          catchError(this.handleError<any>("updateTask"))
        );
    }

    updateTaskOrder(taskItems: Task[]){
      const updateUrl = `http://localhost:3000/tasks_order`;
      return this.http
      .put(updateUrl, taskItems, httpOptions)
      .pipe(
        tap(_ => this.log(`updated taskItems id=`)),
        catchError(this.handleError<any>("update taskItems order"))
      );
    }
    updateTaskGroup(taskItems: Task[]){
      const updateUrl = `http://localhost:3000/complete_all`;
      return this.http
      .put(updateUrl, taskItems, httpOptions)
      .pipe(
        tap(_ => this.log(`updated taskItems id=`)),
        catchError(this.handleError<any>("update taskItems order"))
      );
    }
    deleteTask(taskItem: Task): Observable<boolean> {
      let id = new ObjectId()
      id  = JSON.parse(JSON.stringify(taskItem._id))
      // let projectId = new ObjectId()
      // projectId = JSON.parse(JSON.stringify(taskList.project_id))
      const deleteUrl = `http://localhost:3000/tasks/${id.$oid}`;
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