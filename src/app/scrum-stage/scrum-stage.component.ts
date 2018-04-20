import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TaskList } from "../task-list";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { EditTaskListDialogComponent } from "../edit-task-list-dialog/edit-task-list-dialog.component";
import { EditTaskDialogComponent } from "../edit-task-dialog/edit-task-dialog.component";
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormField } from "@angular/material";
import { TasklistService, TaskOrder } from "../tasklist.service";
import { TaskService, ObjectId } from "../task.service";
import { Task } from "../task";
import { puts } from "util";
import { Project } from "../project";
import { ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs';
@Component({
  selector: "app-scrum-stage",
  templateUrl: "./scrum-stage.component.html",
  styleUrls: ["./scrum-stage.component.css"]
})
export class ScrumStageComponent implements OnInit {
  toggleDiv: boolean = true;
  @Input() tasklist: TaskList;
  @Input() project:Project;
  @Output() deleteRequest = new EventEmitter<TaskList>();
  @Output() editRequest = new EventEmitter<TaskList>();
  @Output() addAfterRequest = new EventEmitter<TaskList>();
  addedTask: string;
  taskListId: string;
  activeTask: Task[];
  tasks: Task[];
  completedTasks: Task[];
  taskOrders: Array<TaskOrder>;
  isShowCompletedTask:boolean
  constructor(
    public editDialog: MatDialog,
    private router: Router,
    private activedRouter: ActivatedRoute,
    private taskService: TaskService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.isShowCompletedTask=false;
    // console.log(this.tasklist)
    let id = new ObjectId();
    id = JSON.parse(JSON.stringify(this.tasklist._id));
    console.log(id.$oid);
    this.taskListId = id.$oid;
    this.freshTask();
  }
  /**
   * operation of tasklist
   */
  onDeleteReq() {
    this.deleteRequest.emit(this.tasklist);
  }
  onEditReq() {
    this.editRequest.emit(this.tasklist);
  }
  onAddAfterReq(task_list_title) {
    this.addAfterRequest.emit(task_list_title);
  }
  openEditDialog() {
    let dialogRef = this.editDialog.open(EditTaskListDialogComponent, {
      width: "240px",
      height: "300px",
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.tasklist.task_list_title = result;
      this.onEditReq();
    });
  }
  openAddAfterDialog() {
    let dialogRef = this.editDialog.open(EditTaskListDialogComponent, {
      width: "240px",
      height: "300px",
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");

      this.onAddAfterReq([result, this.tasklist.task_list_order]);
    });
  }
  /**
   * operation of task********************************************************************************
   * ****************************************************************************************************
   * ****************************************************************************************************
   */

  /**
   * get lists form database and sort by tasklist order
   */
  freshTask() {
    this.taskService.getTasks(this.taskListId).subscribe(tasks => {
      this.tasks = tasks;
      this.activeTask = null;
      this.activeTask = new Array<Task>();
       this.completedTasks=null;
      this.completedTasks = new Array<Task>();
      for (let task of this.tasks) {
        
        if (task.task_isComplete) {
          this.completedTasks.push(task);
        } else {
          this.activeTask.push(task);
        }
      }
      this.sortTasks();
      console.log(tasks);
      console.log(this.activeTask);
      // console.log(`all task lists:${taskLists}`)
    });
  }
  addTask() {
   // this.toggle()
    let task = new Task();
    task.task_title = this.addedTask;
    task.task_creatTime = new Date();
    task.task_isComplete = false;
    task.task_remind = "0";
    task.task_repeat = "0";
    task.task_list_id = this.taskListId;
    task.task_prl = 0;
    task.task_order = this.activeTask.length + 1;

    this.taskService.addTask(task).subscribe(addedtask => {
      // console.log("a new tasklist created"),
        console.log(addedtask),
        //this.freshTaskList()
        this.activeTask.push(addedtask);
       // console.log(this.tasks)
      //console.log(this.tasks);
    });
  }
  updateOrder() {
    for (let i in this.activeTask) {
      this.activeTask[i].task_order = Number(i);
    }
    this.taskService.updateTaskOrder(this.activeTask).subscribe(isSuccess => {
      if (isSuccess) {
        console.log(`order has been successfully modified`);

        //this.freshTaskList();
      } else {
        console.log(`order modifying has failed`);
      }
    });
    //update completed order
    for (let i in this.completedTasks) {
      this.completedTasks[i].task_order = Number(i);
    }
    this.taskService.updateTaskOrder(this.completedTasks).subscribe(isSuccess => {
      if (isSuccess) {
        console.log(`order has been successfully modified`);

        //this.freshTaskList();
      } else {
        console.log(`order modifying has failed`);
      }
    });
  }
  sortTasks() {
    let by = function(name) {
      return function(o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
          a = o[name];
          b = p[name];
          if (a === b) {
            return 0;
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1;
          }
          return typeof a < typeof b ? -1 : 1;
        } else {
          throw "error";
        }
      };
    };
    this.activeTask.sort(by("task_order"));
    this.completedTasks.sort(by("task_order"));
  }
  // onAddAfter(data: any) {
  //   let task = new Task();
  //   task.task_title = this.addedTask;
  //   task.task_creatTime = new Date();
  //   task.task_isComplete = false;
  //   task.task_isRemind = false;
  //   task.task_isRepeat = false;
  //   task.task_list_id = this.taskListId;
  //   task.task_prl = 0;
  //   task.task_order = this.tasks.length + 1;
  //   this.taskService.addTask(task).subscribe(tasklist => {
  //     console.log("a new tasklist created"),
  //       //console.log(taskList),
  //       //this.freshTaskList()
  //       //create不能返回id的解决办法，但是push和更新可以，所以可以先push，然后更新，之后仔进行操作
  //       this.tasks.push(task),
  //       this.freshListForOrder(data),
  //       console.log(this.tasks);
  //     // this.updateOrder()
  //   });
  // }
  //为解决不能返回id的问题专门写的
  freshListForOrder(data: any) {
    this.taskService.getTasks(this.taskListId).subscribe(tasks => {
      this.tasks = tasks;
      this.sortTasks();
      console.log(tasks);
      this.tasks.splice(data[1] + 1, 0, this.tasks[this.tasks.length - 1]),
        this.tasks.pop(),
        console.log(this.tasks);
      this.updateOrder();
      // console.log(`all task lists:${taskLists}`)
    });
  }
  onEdit(task: Task) {
    //tasklist.task_list_title="cheng"
    this.taskService.updateTask(task).subscribe(isSuccess => {
      if (isSuccess) {
        console.log(`${task.task_title} has been successfully modified`);
      this.freshTask();
        //this.freshTaskList();
      } else {
        console.log(`${task.task_title} modifying has failed`);
      }
    });
  }
  
  /**
   * delete a list from database,and update the new order to data base
   */

  onDestroy(task: Task){
    this.taskService.updateTask(task).subscribe(isSuccess => {
      if (isSuccess) {
        console.log(`${task.task_title} has been successfully destroyed`);
        this.completedTasks.unshift(task);
        this.activeTask.splice(this.activeTask.indexOf(task), 1);
        this.updateOrder();
        
      } else {
        console.log(`${task.task_title} de
          stroy has failed`);
      }
    });
  }
  
  onRevive(task:Task){
    task.task_isComplete=false;
    //this.completedTasks.splice(this.activeTask.indexOf(task), 1);
    this.taskService.updateTask(task).subscribe(isSuccess => {
      if (isSuccess) {
        console.log(`${task.task_title} has been successfully destroyed`);
        this.activeTask.push(task);
        this.updateOrderForOnRevive();
        } else {
        console.log(`${task.task_title} de
          stroy has failed`);
      }
    });
  }
  updateOrderForOnRevive() {
    for (let i in this.activeTask) {
      this.activeTask[i].task_order = Number(i);
    }
    this.taskService.updateTaskOrder(this.activeTask).subscribe(isSuccess => {
      //fresk tasks
      this.taskService.getTasks(this.taskListId).subscribe(tasks => {
        this.tasks = tasks;
        this.activeTask = null;
        this.activeTask = new Array<Task>();
         this.completedTasks=null;
        this.completedTasks = new Array<Task>();
        for (let task of this.tasks) {
          
          if (task.task_isComplete) {
            this.completedTasks.push(task);
          } else {
            this.activeTask.push(task);
          }
        }
        this.sortTasks();
        this.updateCompletedOrder();
        
        // console.log(`all task lists:${taskLists}`)
      });
      
    });
    //update completed order
    
  }
  updateCompletedOrder(){
    for (let i in this.completedTasks) {
      this.completedTasks[i].task_order = Number(i);
    }
    this.taskService.updateTaskOrder(this.completedTasks).subscribe(isSuccess => {
      if (isSuccess) {
        console.log(`order has been successfully modified`);

        //this.freshTaskList();
      } else {
        console.log(`order modifying has failed`);
      }
    });
  }
  showOrHideCompletedTask(){
    this.isShowCompletedTask=!this.isShowCompletedTask;
  }
  completeAllTasks(){
    for(let task of this.activeTask){
      task.task_isComplete=true
      this.completedTasks.unshift(task)
    }
    this.taskService.updateTaskGroup(this.activeTask).subscribe(isSuccess => {
     
        this.activeTask=null,
        this.activeTask=new Array<Task>(),
        console.log(`order has been successfully modified`);
        this.updateOrder();
        //this.freshTaskList();
      
    });

  }
  moveAllTask(){

  }
  /**
   * operation of edit dialog
   * @param event o
   * @param task 
   */
  openTaskEditDialog(event:any,task:Task){
    event.stopPropagation();
    let dialogRef = this.editDialog.open(EditTaskDialogComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: "600px",
      height: "80%",
      data: { target:task,project:this.project,tasklist:this.tasklist}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.onEdit(task);
      console.log("The dialog was closed");
      console.log(task)
      // this.tasklist.task_list_title = result;
      // this.onEditReq();
    });
  }
  toggle(): void {
    this.toggleDiv = !this.toggleDiv;
  }
}
