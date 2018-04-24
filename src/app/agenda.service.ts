import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Project } from "./project";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { of } from "rxjs/observable/of";
import { MessageService } from "./message.service";
import { Router, ActivatedRoute } from "@angular/router";

import{Agenda} from "./agenda"
@Injectable()
export class AgendaService {
  private agendas: Agenda[];
  private tasksUrl:string;
  constructor(private http: HttpClient,
    private messageService: MessageService) { }
    public getAgendas(projectId:string): Observable<Agenda[]> {
      const url =`http://localhost:3000/projects/${projectId}/agendas`
      return this.http
        .get<Agenda[]>(url, httpOptions)
        .pipe(
          tap(projectes => this.log(`fetched tasklists`)),
          catchError(this.handleError("getTaskLists", []))
        );
    }

    addAgenda(agenda: Agenda): Observable<Agenda> {
      return this.http
        .post<Agenda>(`http://localhost:3000/projects/${agenda.project_id}/agendas`, agenda, httpOptions)
        .pipe(
          tap((agenda: any) => this.log(`added agendas w/ id=`)),
          catchError(this.handleError<any>("addagendas"))
        );
    }
    updateAgenda(agenda: Agenda): Observable<boolean> {
      
      let id = new ObjectId()
      id  = JSON.parse(JSON.stringify(agenda._id))
      const updateUrl = `http://localhost:3000/agendas/${id.$oid}`;
      return this.http
        .put(updateUrl, agenda, httpOptions)
        .pipe(
          tap(_ => this.log(`updated agenda id=${agenda._id}`)),
          catchError(this.handleError<any>("updateAgenda"))
        );
    }

    
  
    deleteAgenda(agenda: Agenda): Observable<boolean> {
      let id = new ObjectId()
      id  = JSON.parse(JSON.stringify(agenda._id))
      // let projectId = new ObjectId()
      // projectId = JSON.parse(JSON.stringify(taskList.project_id))
      const deleteUrl = `http://localhost:3000/agendas/${id.$oid}`;
      return this.http
        .delete<Agenda>(deleteUrl, httpOptions)
        .pipe(
          tap(_ => this.log(`deleted Agenda id=`)),
          catchError(this.handleError<any>("deleteAgenda"))
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