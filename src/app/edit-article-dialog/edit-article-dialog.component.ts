import { Component, OnInit,Inject ,ViewChild} from '@angular/core';
import {TasklistService} from '../tasklist.service'

import { Project } from "../project";
import { MatDialog, MatSelect,MatDialogRef,MAT_DIALOG_DATA, MatMenuItem} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {OverlayModule, Overlay, ScrollStrategyOptions} from '@angular/cdk/overlay';
import { element, by } from 'protractor';
import { TaskCommentService } from "../task-comment.service";
import { TaskComment } from "../task-comment";
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
  selector: 'app-edit-article-dialog',
  templateUrl: './edit-article-dialog.component.html',
  styleUrls: ['./edit-article-dialog.component.css']
})
export class EditArticleDialogComponent implements OnInit {
  articleTitle: String =new String();
  articleContent:String =new String();
  constructor(public dialogRef: MatDialogRef<EditArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
    @ViewChild('editor') editor: QuillEditorComponent
  ngOnInit() {
    if(this.data.isEdit){
      this.articleContent=this.data.share.share_content;
      this.articleTitle=this.data.share.share_title;
    }
    this.editor
    .onContentChanged.debounceTime(400)
    .distinctUntilChanged()
    .subscribe(data => {
      console.log('view child + directly subscription', data)
    });
  }
  onNoClick(): void {
    this.dialogRef.close();


  }
  cancel(){
    this.saveArticle()
    this.onNoClick()
  }
  saveArticle(){
    this.data.share.share_content=this.articleContent;
    if(this.articleTitle.length==0){
      this.data.share.share_title='Untitled'
    }
    else{
      this.data.share.share_title=this.articleTitle;

    }
    if(!this.data.isEdit){
      this.data.share.share_creatTime = new Date();

    }
    this.data.share.last_modified_time=new Date();

    console.log(this.data.share.share_content);
    console.log(this.data.project)

  }
}
