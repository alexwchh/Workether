import { Component, OnInit,Inject} from '@angular/core';
import {ProjectService} from '../project.service'
import { Project } from '../project';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {
  projectName:string
  dialogDes:string

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService:ProjectService,
  private cookies:CookieService) 
    { 
     
    }

      ngOnInit() {
        if(this.data.isEdit){
          console.log(this.data.project.project_name)
          this.projectName=this.data.project.project_name;
          this.dialogDes='Change the name of this project.'
        }
        else{
       
          this.dialogDes='What do you name your project?'

        }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addProject(){
    if(this.data.isEdit){
       this.data.project.project_name= this.projectName; 
       this.dialogRef.close();
    }
    else{
      console.log("conut")
      let date = new Date()
      let project = new Project(this.projectName,date,false,true)
      
      project.project_owner= this.cookies.get('current_user_id')
      project.user_id= this.cookies.get('current_user_id')
      this.dialogRef.close(project);
    // this.projectService.addedProject(project)
    
    }
    
   
  }
}
