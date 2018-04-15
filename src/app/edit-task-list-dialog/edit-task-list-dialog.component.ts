import { Component, OnInit,Inject } from '@angular/core';
import {TasklistService} from '../tasklist.service'
import { TaskList } from '../task-list';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-edit-task-list-dialog',
  templateUrl: './edit-task-list-dialog.component.html',
  styleUrls: ['./edit-task-list-dialog.component.css']
})
export class EditTaskListDialogComponent implements OnInit {
  tasklistName:string
  ngOnInit() {
  }
  constructor(
    public dialogRef: MatDialogRef<EditTaskListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService:TasklistService) 
    { 
     
    }

    

  onNoClick(): void {
    this.dialogRef.close();
  }
  editTaskList(){
    
    this.dialogRef.close(this.tasklistName);
  }
}