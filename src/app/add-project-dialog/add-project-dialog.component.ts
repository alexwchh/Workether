import { Component, OnInit,Inject } from '@angular/core';
import {ProjectService} from '../project.service'
import { Project } from '../project';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {
  projectName:string
  ngOnInit() {
  }
  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService:ProjectService) 
    { 
     
    }

    

  onNoClick(): void {
    this.dialogRef.close();
  }
  addProject(){
    let project = new Project(this.projectName,Date.now(),false,true)
    this.projectService.addedProject(project)
    this.dialogRef.close();
  }
}
