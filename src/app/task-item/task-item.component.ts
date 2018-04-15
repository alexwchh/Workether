import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {  Task} from "../task";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EditTaskListDialogComponent } from "../edit-task-list-dialog/edit-task-list-dialog.component";

import { Router, ActivatedRoute } from "@angular/router";
import { MatFormField } from "@angular/material";
import { TasklistService, TaskOrder } from "../tasklist.service";
import { TaskService,ObjectId } from "../task.service";
import { puts } from "util";
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task:Task
  @Output() deleteRequest = new EventEmitter<Task>();
  @Output() editRequest = new EventEmitter<Task>();
  @Output() addAfterRequest = new EventEmitter<Task>();
  @Output() reviveRequest = new EventEmitter<Task>();

  constructor(public editDialog: MatDialog) { }
  isComplete:boolean
  ngOnInit() {
    this.isComplete=this.task.task_isComplete;
  }
  onDeleteReq(){
    if(this.task.task_isComplete)
    {
      this.reviveRequest.emit(this.task)
    }
    else{
      this.task.task_isComplete=true;
      this.deleteRequest.emit(this.task)
    }
   
 
   }
   onEditReq(){
     this.editRequest.emit(this.task)
   }
   onAddAfterReq(task_list_title){
     this.addAfterRequest.emit(task_list_title)
   }
  
   openEditDialog(){
    let dialogRef = this.editDialog.open(EditTaskListDialogComponent, {
      width: '240px',
      height: '300px',
      data: {  }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.task.task_title = result;
      this.onEditReq();
    });
  }
  openAddAfterDialog(){
    let dialogRef = this.editDialog.open(EditTaskListDialogComponent, {
      width: '240px',
      height: '300px',
      data: {  }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      this.onAddAfterReq([result,this.task.task_order]);
    });
  }
}
