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

@Component({
  selector: 'app-share-page',
  templateUrl: './share-page.component.html',
  styleUrls: ['./share-page.component.css']
})
export class SharePageComponent implements OnInit {
  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
  @ViewChild('textEditorPre') private _textEditorPre: TdTextEditorComponent;

  projectId: string;
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
  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private tasklistService: TasklistService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public editDialog: MatDialog,
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
  openTaskEditDialog(event:any,task:Task){
    event.stopPropagation();
    let dialogRef = this.editDialog.open(EditArticleDialogComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: "600px",
      height: "100%",
      data: { target:task,project:this.project,tasklist:this.tasklist}
    });
    dialogRef.afterClosed().subscribe(result => {
      
      console.log("The dialog was closed");
      console.log(task)
      // this.tasklist.task_list_title = result;
      // this.onEditReq();
    });
  }

}
