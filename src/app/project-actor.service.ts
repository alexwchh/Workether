import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Project } from "./project";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { of } from "rxjs/observable/of";
import { MessageService } from "./message.service";
import { Router, ActivatedRoute } from "@angular/router";
import {  ProjectActor} from "./project-actor";
import { ObjectId } from "./share.service";
@Injectable()
export class ProjectActorService {
  projectActors:Array<ProjectActor> = new Array<ProjectActor>()
  constructor(private http: HttpClient,
    private messageService: MessageService) { 

  }
  public getProjectActors(projectId:string): Observable<any> {
    const url =`http://localhost:3000/projects/${projectId}/project_actors`
    return this.http
      .get<any>(url, httpOptions)
      .pipe(
        tap(projectes => this.log(`fetched tasklists`)),
        catchError(this.handleError("getTaskLists", []))
      );
  }
  addProjectActor(projectActor: ProjectActor): Observable<ProjectActor> {
    return this.http
      .post<ProjectActor>(`http://localhost:3000/projects/${projectActor.project_id}/project_actors`, projectActor, httpOptions)
      .pipe(
        tap((projectActor: any) => this.log(`added projectActor w/ id=`)),
        catchError(this.handleError<any>("addProjectActor"))
      );
  }
  addProjectActorGroup(projectActors:any,projectId:string):Observable<ProjectActor[]>{
    return this.http
    .post<ProjectActor[]>(`http://localhost:3000/projects/${projectId}/project_actors_group`, projectActors, httpOptions)
    .pipe(
      tap((projectActor: any) => this.log(`added projectActor w/ id=`)),
      catchError(this.handleError<any>("addProjectActor"))
    );

  }
  updateProjectActor(projectActor: ProjectActor): Observable<boolean> {
      
    let id = new ObjectId()
    id  = JSON.parse(JSON.stringify(projectActor._id))
    const updateUrl = `http://localhost:3000/project_actors/${id.$oid}`;
    return this.http
      .put(updateUrl, projectActor, httpOptions)
      .pipe(
        tap(_ => this.log(`updated project actor id=${projectActor._id}`)),
        catchError(this.handleError<any>("updateProject"))
      );
  }
  deleteProjectActor(projectActor: ProjectActor): Observable<boolean> {
    let id = new ObjectId()
    id  = JSON.parse(JSON.stringify(projectActor._id))
    // let projectId = new ObjectId()
    // projectId = JSON.parse(JSON.stringify(taskList.project_id))
    const deleteUrl = `http://localhost:3000/project_actors/${id.$oid}`;
    return this.http
      .delete<ProjectActor>(deleteUrl, httpOptions)
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
