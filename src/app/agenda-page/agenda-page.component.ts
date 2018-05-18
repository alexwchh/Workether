import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormField } from "@angular/material";
import { TasklistService, TaskOrder } from "../tasklist.service";
import { TaskList } from "../task-list";
import { puts } from "util";
import { Project } from "../project";
import { ViewContainerRef } from "@angular/core";
import { TdDialogService } from "@covalent/core/dialogs";
import { Task } from "../task";
import {
  MatExpansionModule,
  MatExpansionPanel
} from "@angular/material/expansion";
import { DatePicker } from "angular2-datetimepicker/datepicker.component";
import {   AgendaService} from "../agenda.service";
import { Agenda } from "../agenda";

const VISIBILITY= "visibility"
const VISIBILITY_OFF = "visibility_off"
@Component({
  selector: "app-agenda-page",
  templateUrl: "./agenda-page.component.html",
  styleUrls: ["./agenda-page.component.css"]
})

export class AgendaPageComponent implements OnInit {
  date:Date = new Date();
  fromDate: Date = new Date();
  toDate:Date =new Date();
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'yyyy/dd/MM hh:mm',
        defaultOpen: false};
  repeatValue:string
  remindValue:string
  pastVisibility:boolean;
  beforeTodayVisibility:boolean;
  futureVisibility:boolean;
  futureVisibilityIcon:string;
  beforeTodayVisibilityIcon:string;
  visibilityIcon:string; 
  projectId: string;
  project:Project;
  projectName:string;
  agendas: Agenda[];
  todayAgenda:Agenda[];
  beforeTodayAgenda:Agenda[];
  pastAgenda:Agenda[];
  futureAgenda:Agenda[];
  addedAgenda:string
 
  @ViewChild("expd") child: MatExpansionPanel;
  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private agendaService: AgendaService
  ) {
    this.projectId = this.activedRouter.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.agendas=new Array<Agenda>();
    this.initAgendaArray();
    this.freshAgendas()
    this.pastVisibility =false;
    this.beforeTodayVisibility=true;
    this.futureVisibility=true;
    
    this.visibilityIcon=VISIBILITY;
    this.beforeTodayVisibilityIcon=VISIBILITY_OFF;
    this.futureVisibilityIcon=VISIBILITY_OFF;
  
  }
 initAgendaArray(){
  
  this.todayAgenda=new Array<Agenda>();
  this.beforeTodayAgenda=new Array<Agenda>();
  this.pastAgenda=new Array<Agenda>();
  this.futureAgenda=new Array<Agenda>();
 }
  closePanel() {
    this.child.close();
  }
  togglePastVisibility(){
    this.pastVisibility = !this.pastVisibility
    if(this.pastVisibility){
       this.visibilityIcon=VISIBILITY_OFF
    }
    else{
      this.visibilityIcon=VISIBILITY
    }
 
  }
  toggleBeforeVis(){
    this.beforeTodayVisibility = !this.beforeTodayVisibility
    if(this.beforeTodayVisibility){
       this.beforeTodayVisibilityIcon=VISIBILITY_OFF
    }
    else{
      this.beforeTodayVisibilityIcon=VISIBILITY
    }
  }
  toggleFutureVis(){
    this.futureVisibility = !this.futureVisibility
    if(this.futureVisibility){
       this.futureVisibilityIcon=VISIBILITY_OFF
    }
    else{
      this.futureVisibilityIcon=VISIBILITY
    }
  }
  addAgenda() {
    let agenda = new Agenda();
    agenda.agenda_title = this.addedAgenda;
    agenda.agenda_start_time=this.fromDate;
    agenda.agenda_end_time=this.toDate;
    agenda.agenda_isComplete = false;
    agenda.agenda_remind = this.remindValue;
    agenda.agenda_repeat=this.repeatValue;
    agenda.project_id = this.projectId;
   

    this.agendaService.addAgenda(agenda).subscribe(addedAgenda => {
      console.log("a new tasklist created"),
        console.log(addedAgenda),
        //this.freshTaskList()
        this.agendas.push(addedAgenda),
        this.addedAgenda='';
        console.log(this.agendas);
        this.initAgendaArray();
        this.classifyAgenda();
        this.closePanel();
    });
  }
  updateAgenda(agenda:Agenda){
    this.agendaService.updateAgenda(agenda).subscribe(isSuccess=>{
      this.freshAgendas();
      this.closePanel();
    })
  }

  freshAgendas() {
    
    this.agendaService.getAgendas(this.projectId).subscribe(resultArray => {
      // this.taskLists = taskLists;
      this.agendas = resultArray["agendas"]
      this.project=resultArray["project"];
      this.projectName=this.project.project_name;
      this.initAgendaArray()
      this.classifyAgenda();
      //get lists form database and sort by tasklist order
  console.log(this.agendas);
      //console.log(taskLists);
      // console.log(`all task lists:${taskLists}`)
    });
  }
  classifyAgenda(){
    for (let agenda of this.agendas){
      let date =new Date();
      let agendaEndDay=new Date(agenda.agenda_end_time);
      let agendaStartDate = new Date(agenda.agenda_start_time);
      console.log(date.getDate())
      if((agendaStartDate.getDate())==(date.getDate())){

        this.todayAgenda.push(agenda);
       
      }
      else if((agendaEndDay.getDate())>(date.getDate())
      &&(agendaStartDate.getDate())<(date.getDate())
    
    ){
        this.beforeTodayAgenda.push(agenda);

      }
      else if((agendaEndDay.getDate())<(date.getDate())){
        this.pastAgenda.push(agenda);
      }
      else if((agendaStartDate.getDate())>(date.getDate())){
       this.futureAgenda.push(agenda)
      }
    }
  }
  deleteAgenda(agenda:Agenda){
    this.agendaService.deleteAgenda(agenda).subscribe(isSuccess=>{
      this.freshAgendas();
    })
  }

}
