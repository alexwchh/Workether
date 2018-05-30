import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Project } from "./project";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { of } from "rxjs/observable/of";
import { MessageService } from "./message.service";
import {
  ProjectOperation,
  ProjectPageComponent
} from "./project-page/project-page.component";
import { CookieService } from 'ngx-cookie-service';
import { Task } from "./task";
@Injectable()
export class ProjectService {
  private projectsUrl = "http://localhost:3000/projects";
  private projects: Project[];
  private projectaddedSource = new Subject<Project>();
  private projectcpmfirmedSource = new Subject<Project>();
  projectAdded$ = this.projectaddedSource.asObservable();
  projectConfirmed$ = this.projectcpmfirmedSource.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cookieService: CookieService
  ) {}

  public getProjects(userId:string): Observable<Project[]> {
    return this.http
      .get<Project[]>(`http://localhost:3000/users/${userId}/projects`, httpOptions)
      .pipe(
        tap(projectes => this.log(`fetched projectes`)),
        catchError(this.handleError("getProjectes", []))
      );
  }

 

  getProject(id: string): Observable<Project> {
    // Todo: send the message _after_ fetching the project
    const url = `${this.projectsUrl}/${id}`;
    return this.http
      .get<Project>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`fetched project id=${id}`)),
        catchError(this.handleError<Project>(`getProject id=${id}`))
      );
  }

  addProject(project: Project): Observable<Project> {
    return this.http
      .post<Project>(`http://localhost:3000/users/${project.user_id}/projects`, project, httpOptions)
      .pipe(
        tap((project: Project) => this.log(`added project w/ id=`)),
        catchError(this.handleError<Project>("addProject"))
      );
  }
  updateProject(project: Project): Observable<boolean> {
    let id = new ObjectId()
    id  = JSON.parse(JSON.stringify(project._id))
    const updateUrl = `${this.projectsUrl}/${id.$oid}`;
    return this.http
      .put(updateUrl, project, httpOptions)
      .pipe(
        tap(_ => this.log(`updated project id=${project._id}`)),
        catchError(this.handleError<any>("updateProject"))
      );
  }
  deleteProject(project: Project): Observable<boolean> {
    let id = new ObjectId()
    id  = JSON.parse(JSON.stringify(project._id))
    const deleteUrl = `${this.projectsUrl}/${id.$oid}`;
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

  addedProject(project: Project) {
    this.projectaddedSource.next(project);
  }
  confirmProject() {}
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