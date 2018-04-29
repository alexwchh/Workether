import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormField } from "@angular/material";
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
  selectedText:String;
  texts:String[];
  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private tasklistService: TasklistService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) { 
    this.projectId = this.activedRouter.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.opened=false;
    console.log("sadfasdfasdfasdgds")
    this.texts =["# Intro Go ahead, play around with the editor! Be sure to check out **bold** and *italic* styling, or even [links](https://google.com). You can type the Markdown syntax, use the toolbar, or use shortcuts like 'cmd-b' or 'ctrl-b'.## ListsUnordered lists can be started using the toolbar or by typing '* ', '- ', or '+ '. Ordered lists can be started by typing '1. '. #### Unordered* Lists are a piece of cake* They even auto continue as you type* A double enter will end them* Tabs and shift-tabs work too#### Ordered1. Numbered lists..  2. ...work too!## What about images?","asdgsdgdsgdfgdfgdfg"]
    
  }
  ngAfterViewInit(): void {
    // this._textEditorPre.togglePreview();
    
  }
  toggleSideNav()
  {
    this.opened=!this.opened;
  }
  selectText(text:String){
    this.selectedText=text;
    if(this._textEditorPre.isPreviewActive){
      this._textEditorPre.togglePreview();

    }

  }


}
