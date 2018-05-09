import { Component, OnInit,Inject } from '@angular/core';
import {ProjectService} from '../project.service'
import { Project } from '../project';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{AddProjectDialogComponent} from '../add-project-dialog/add-project-dialog.component'
import { Router } from "@angular/router";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   project:Project
   name:string
  constructor(private projectService: ProjectService,public  dialog: MatDialog,private router:Router) { }
  ngOnInit() {
  }
  add(){
    this.projectService.addProject(this.project).subscribe(project=>{console.log(project)})
  }
  openDialog():void{
    
    let dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '250px',
      height: '400px',
      data: { isEdit:false,}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projectService.addedProject(result)
      this.router.navigateByUrl('/projects')
    });
  }


}
// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }