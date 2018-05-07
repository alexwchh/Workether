import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormField } from "@angular/material";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {  EditArticleDialogComponent} from "../edit-article-dialog/edit-article-dialog.component";
import { TasklistService, TaskOrder } from "../tasklist.service";
import { TaskList } from "../task-list";
import { puts } from "util";
import { Project } from "../project";
import { ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs';
import { Task } from "../task";
import { TdTextEditorComponent } from '@covalent/text-editor';
import { ShareService } from "../share.service";
import { Share } from "../share";
@Component({
  selector: 'app-share-page',
  templateUrl: './share-page.component.html',
  styleUrls: ['./share-page.component.css']
})
export class SharePageComponent implements OnInit {
  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
  @ViewChild('textEditorPre') private _textEditorPre: TdTextEditorComponent;

  projectId: string;
  project: Project;
  date:Date=new Date()
  events = [];
  opened:boolean;
  options: any = {
    lineWrapping: true,
    autosave:true,
    // toolbar: true,
    autoDownloadFontAwesome:true,
    hideIcons:["side-by-side","fullscreen"]
  };
  preOptions:any ={
    lineWrapping: true,
    autosave:true,
    // toolbar: false,
    autoDownloadFontAwesome:true,
  }
  selectedText:string;
  texts:string[];
  shares: Share[] = new Array<Share>();
  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private tasklistService: TasklistService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public editDialog: MatDialog,
    private shareService:ShareService
  ) { 
    this.projectId = this.activedRouter.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.opened=false;
    console.log("sadfasdfasdfasdgds")
this.texts = ["text1","text2","text1","text2","text1","text2","text1","text2","text1","text2","text1","text2","text1","text2"];    
  }
  ngAfterViewInit(): void {
    // this._textEditorPre.togglePreview();
    
  }
  toggleSideNav()
  {
    this.opened=!this.opened;
  }
  selectText(text:string){
    this.selectedText=text;
    this._textEditorPre.value=text;
    if(!this._textEditorPre.isPreviewActive()){
     
      this._textEditorPre.togglePreview();

    }

  }
  addShare(){
    let share = new Share();
    share.share_title;
    share.share_creatTime = new Date();
    share.share_content;
    share.last_modified_time=new Date();
    share.project_id=this.projectId
   

    this.shareService.addShare(share).subscribe(addedTasklist => {
      console.log("a new tasklist created"),
        console.log(addedTasklist),
        //this.freshTaskList()
        this.shares.push(addedTasklist),
        console.log(this.shares);
    });
  }
  updateShare(share: Share){
   this.shareService.updateShare(share).subscribe(isSuccess=>{});
  }
  freshShares(){
    this.shareService.getShares(this.projectId).subscribe(resultArray => {
      // this.taskLists = taskLists;
      this.shares = resultArray["shares"]
      this.project=resultArray["project"];
      //get lists form database and sort by tasklist order
     
      //console.log(taskLists);
      // console.log(`all task lists:${taskLists}`)
    });
  }
  openArticleEditDialog(event:any){
    event.stopPropagation();
    let added_share = new Share();
    let dialogRef = this.editDialog.open(EditArticleDialogComponent, {
      panelClass: 'myapp-no-padding-dialog',
      maxWidth:"none",
      width: "100%",
      height: "100%",
      data: { project:this.project,share:added_share}
    });
    dialogRef.afterClosed().subscribe(result => {
      
      console.log("The dialog was closed");
      // this.tasklist.task_list_title = result;
      // this.onEditReq();
    });
  }

}
