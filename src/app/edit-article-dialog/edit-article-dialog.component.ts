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
@Component({
  selector: 'app-edit-article-dialog',
  templateUrl: './edit-article-dialog.component.html',
  styleUrls: ['./edit-article-dialog.component.css']
})
export class EditArticleDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
  }

}
