import {
  Component,
  OnInit,
  ViewChild,
  Input,
  TemplateRef,
  ElementRef
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormField, MatButton } from "@angular/material";
import { ProjectService } from "../project.service";
import { Project } from "../project";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { TdDigitsPipe } from '@covalent/core/common';
import {  single,multi} from "./data";
import { CovalentLayoutModule } from '@covalent/core/layout';
import { TranslateService } from '@ngx-translate/core';
import { TaskList } from "../task-list";
import { Task } from "../task";
import {  TaskService} from "../task.service";
import { TasklistService } from "../tasklist.service";
import { take } from "rxjs/operator/take";

@Component({
  selector: "app-statics",
  templateUrl: "./statics.component.html",
  styleUrls: ["./statics.component.scss"]
})
export class StaticsComponent implements OnInit {
  projectId: string;
  tasklists:TaskList[] = new Array<TaskList>();
  tasks:Task[]=new Array<Task>();
  completeTasks:Task[]=new Array<Task>();
  notCompleteTasks:Task[]=new Array<Task>();
  dueTasks:Task[]=new Array<Task>();



  completeTaskCount:number=0;
  allTaskCount:number=0;
  notCompleteCount:number=0;
  dueCount=0;
  projectName: string;
  project: Project;
  weekDate:Date[]=new Array<Date>();
  weekStar:Date;
  weekEnd:Date;
  // Chart
  single: any[];
  singleArr:singleObject[]= new Array<singleObject>();
  multi: any[];
  multiArr:multiObject[] = new Array<multiObject>();

  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "";
  showYAxisLabel: boolean = true;
  yAxisLabel: string = "Sales";

  colorScheme: any = {
    // domain: ["#1565C0", "#03A9F4", "#FFA726", "#FFCC80"]
    // domain: ['#0D47A1', '#1976D2', '#039BE5', '#29B6F6']
    domain: [ "#005CAF", "#7DB9DE","#FFB11B", "#FAD689"]
    //domain: ["#227D51", "#91B493", "#CC543A", "#FB966E"]

    


 
  };

  // line, area
  autoScale: boolean = true;

  constructor(
    private activedRouter: ActivatedRoute,
    private projectService: ProjectService,
    private taskListService:TasklistService,
    private taskService:TaskService,
    private _translateService:TranslateService
  ) {
    // Set fallback language
    // this._translateService.setDefaultLang('en');

    // // Supported languages
    // this._translateService.addLangs(['en', 'es']);
    // this._translateService.use('en');

    this.singleArr=JSON.parse(JSON.stringify(single))
    this.multiArr = JSON.parse(JSON.stringify(multi))
    

    //  this.single=single.map((group:any)=>{
    //    return group;
    //  }

    //  );
    
    //  // Chart Multi
    //  this.multi = multi.map((group: any) => {
    //    group.series = group.series.map((dataItem: any) => {
    //      dataItem.name = new Date(dataItem.name);
    //      return dataItem;
    //    });
    //    return group;
    //  });
  }

  ngOnInit() {
    this.projectId = this.activedRouter.snapshot.paramMap.get("id");
    //this.multi = this.multiArr;
    this.weekStar=this.getWeekStartDate();
    this.weekEnd = this.getWeekEndDate();
    //this.single = this.singleArr;
    //console.log(this.multi);
    this.getProject();
    this.getAllTask();
  }
  getProject() {
    this.projectService.getProject(this.projectId).subscribe(project => {
      this.projectName = project.project_name;
      this.project = project;
    });
  }
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }
  getAllTask(){
    let now = new Date()
    this.taskService.getStatics(this.projectId).subscribe(tasks=>{
      this.tasks = tasks
      this.allTaskCount = this.tasks.length;
      
      for(let task of this.tasks){
        let reminddate = new Date(task.task_remindDate)
        if(task.task_isComplete){
          this.completeTaskCount+=1;
          this.completeTasks.push(task)
        }
        else{
          
          if(task.task_remindDate&&reminddate.getTime()<now.getTime()){
            this.dueCount+=1;
            this.dueTasks.push(task)

          }
          this.notCompleteCount+=1;
          this.notCompleteTasks.push(task)
        }
      }
      this.singleArr[0].value = this.allTaskCount;
     this.singleArr[1].value = this.completeTaskCount;
     this.singleArr[2].value = this.notCompleteCount;
     this.singleArr[3].value = this.dueCount;
      this.single = this.singleArr;
      this.processCompleteTaskAndNotComplete(this.completeTasks,this.tasks);
      //this.processNotComplete(this.notCompleteCount);
      this.processDueTasks(this.dueCount);
      this.processAllTask(this.tasks);
      this.multi=this.multiArr
      //console.log(this.tasks)
    })
  }
  multiStaticsCal(tasks:Task[]){
    for(let task of tasks){

    }
  }
  processCompleteTaskAndNotComplete(tasks:Task[],allTasks:Task[]){
    let countArr = [0,0,0,0,0,0,0];
    let now = new Date();
    for(let task of tasks){
      let taskDate = new Date(task.task_completeDate) 
      if(taskDate.getTime()<this.weekDate[1].getTime()){
          // monCount+=1;
          countArr[0]+=1
      }
      else if(taskDate.getTime()<this.weekDate[2].getTime()){
        countArr[1]+=1

      }else if(taskDate.getTime()<this.weekDate[3].getTime()){
        countArr[2]+=1

      }else if(taskDate.getTime()<this.weekDate[4].getTime()){
        countArr[3]+=1

      }else if(taskDate.getTime()<this.weekDate[5].getTime()){
        countArr[4]+=1

      }else if(taskDate.getTime()<this.weekDate[6].getTime()){
        countArr[5]+=1

      }else if(taskDate.getTime()<this.weekDate[7].getTime()){
        countArr[6]+=1

      }
    }
    let alltasksCount = allTasks.length
    let notCompleteCountArr = [0,0,0,0,0,0,0]
    let notMonCount = 0;
    let notTueCount = 0;
    let notWedCount = 0;
    let notThuCount = 0;
    let notFriCount = 0;
    let notSatCount = 0;
    let notSunCount = 0;
    for (let index = 0; index < countArr.length; index++) {
      
      this.multiArr[0].series[index].value = countArr[index];
    }

    let tmp = 0
    for (let index = 0; index <now.getDay(); index++) {
         tmp = tmp+countArr[index]

      this.multiArr[1].series[index].value = this.allTaskCount-tmp;
      
    }
    // this.multiArr[0].series[0].value = countArr[0];
    // this.multiArr[0].series[1].value = countArr[1];
    // this.multiArr[0].series[2].value = countArr[2];
    // this.multiArr[0].series[3].value = countArr[3];
    // this.multiArr[0].series[4].value = countArr[4];
    // this.multiArr[0].series[5].value = countArr[5];
    // this.multiArr[0].series[6].value = countArr[6];

    // this.multiArr[1].series[0].value = alltasksCount-monCount;
    // this.multiArr[1].series[1].value = alltasksCount-monCount-tueCount;
    // this.multiArr[1].series[2].value = alltasksCount-monCount-tueCount-wedCount;
    // this.multiArr[1].series[3].value = alltasksCount-monCount-tueCount-wedCount-thuCount;
    // this.multiArr[1].series[4].value = alltasksCount-monCount-tueCount-wedCount-thuCount-friCount;
    // this.multiArr[1].series[5].value = alltasksCount-monCount-tueCount-wedCount-thuCount-friCount-satCount;
    // this.multiArr[1].series[6].value = alltasksCount-monCount-tueCount-wedCount-thuCount-friCount-satCount-sunCount;
    console.log(this.multiArr)


  }
  // processNotComplete(notCompleteCount:number){
   
  //   this.multiArr[1].series[0].value = notCompleteCount;
    


  // }
  processDueTasks(duetasksCount:number){
    this.multiArr[2].series[0].value= duetasksCount
  }
  processAllTask(tasks:Task[]){
    let monCount = 0;
    let tueCount = 0;
    let wedCount = 0;
    let thuCount = 0;
    let friCount = 0;
    let satCount = 0;
    let sunCount = 0;
    for(let task of tasks){
      let taskDate = new Date(task.task_creatTime) 
      if(taskDate.getTime()<this.weekDate[1].getTime()){
          monCount+=1;
      }
      else if(taskDate.getTime()<this.weekDate[2].getTime()){
        tueCount+=1

      }else if(taskDate.getTime()<this.weekDate[3].getTime()){
        wedCount+=1

      }else if(taskDate.getTime()<this.weekDate[4].getTime()){
        thuCount+=1

      }else if(taskDate.getTime()<this.weekDate[5].getTime()){
        friCount+=1

      }else if(taskDate.getTime()<this.weekDate[6].getTime()){
        satCount+=1

      }else if(taskDate.getTime()<this.weekDate[7].getTime()){
        sunCount+=1

      }
    }
    this.multiArr[3].series[0].value = monCount;
    this.multiArr[3].series[1].value = tueCount;
    this.multiArr[3].series[2].value = wedCount;
    this.multiArr[3].series[3].value = thuCount;
    this.multiArr[3].series[4].value = friCount;
    this.multiArr[3].series[5].value = satCount;
    this.multiArr[3].series[6].value = sunCount;
    console.log(this.multiArr)


  }
  getWeekStartDate():Date{
    let now = new Date();
    let nowDayOfWeek = now.getDay(); //今天本周的第几天  
    let nowYear = now.getFullYear(); //当前年   
    let nowMonth = now.getMonth(); //月   
    let nowDay = now.getDate(); //日 
    for (let index = 1; index <= 8; index++) {
      this.weekDate.push(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek+index))
      
    } 
    console.log(this.weekDate);
    let starWeekDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek+1)
    return starWeekDate
  }
  getWeekEndDate():Date{
    let now = new Date();
    let nowDayOfWeek = now.getDay(); //今天本周的第几天  
    let nowYear = now.getFullYear(); //当前年   
    let nowMonth = now.getMonth(); //月   
    let nowDay = now.getDate(); //日 
    let endWeekDate = new Date(nowYear, nowMonth, nowDay +( 6-nowDayOfWeek+1))
    return endWeekDate
  }
}
export class singleObject {
  name:string;
  value:number;
}
export class multiObject{
  name:string;
  series:singleObject[];
}