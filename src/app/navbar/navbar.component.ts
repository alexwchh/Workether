import { Component, OnInit,Inject } from '@angular/core';
import {ProjectService} from '../project.service'
import { Project } from '../project';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{AddProjectDialogComponent} from '../add-project-dialog/add-project-dialog.component'
import { Router } from "@angular/router";
import { CovalentNotificationsModule } from '@covalent/core/notifications';
import { CovalentMenuModule } from '@covalent/core/menu';
import {TranslateService} from '@ngx-translate/core';
import {  Activity} from "../tab-bar/tab-bar.component";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   project:Project
   name:string
   activityArr:Activity[] = new Array<Activity>();
   activities:string[] = new Array<string>();
   activityUser:string[]= new Array<string>();
   now:Date;
  constructor(private projectService: ProjectService,
    public  dialog: MatDialog,
    private router:Router,
    private translate: TranslateService
  
  ) { }
  ngOnInit() {
    this.activities = ["创建了一个任务","完成了一个任务","评论了一个任务","创建了一个任务","创建了一个分享","完成了一个任务","评论了一个任务","创建了一个任务",]
    this.activityUser = ["王成浩","张兰","王成浩","王成浩","王成浩","王成浩","张兰","张兰",]
    this.now = new Date();
    for (let index = 0; index < this.activities.length; index++) {
      let activity= new Activity()
      activity.name=this.activityUser[index];
      activity.activity = this.activities[index];
     this.activityArr.push(activity);    
    }
    console.log(this.activityArr);
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
  changeLanguageEN(){
    this.translate.use('en');
  }
  changeLanguageCH(){
    this.translate.use('ch');
  }
logOut(){
  this.router.navigateByUrl('/login')
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