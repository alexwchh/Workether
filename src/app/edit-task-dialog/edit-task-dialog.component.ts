import { Component, OnInit,Inject ,ViewChild} from '@angular/core';
import {TasklistService} from '../tasklist.service'
import { TaskList } from '../task-list';
import { Project } from "../project";
import { MatDialog, MatSelect,MatDialogRef,MAT_DIALOG_DATA, MatMenuItem} from '@angular/material';
import { Task } from '../task';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {OverlayModule, Overlay, ScrollStrategyOptions} from '@angular/cdk/overlay';
import { element, by } from 'protractor';
import {  ObjectId,TagService} from "../tag.service";
import { Tag } from '../tag';
import { TaskCommentService } from "../task-comment.service";
import { TaskComment } from "../task-comment";
import { ArrayType } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {
  targetTask:Task
  tags:Tag[]=new Array<Tag>();
  comments:TaskComment[]=new Array<TaskComment>();
  // project:Project
  // tasklist:TaskList
  // taskContent:string;
  // isCompleted:boolean
  // repeat:number
  // noti:number
  // notesContent:string
  taskId:string
  priorityNormal:boolean
  priorityMedium:boolean
  priorityHigh:boolean
  commentInput:string
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  selectedDate: Date = new Date();
  separatorKeysCodes = [ENTER, COMMA];
  @ViewChild('tag') child: MatMenuItem;
  constructor(public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService:TasklistService,
    public overlay:Overlay,
    public scrollStrategy:ScrollStrategyOptions,
    private tagService:TagService,
    private taskCommentService:TaskCommentService

  ) { }

  ngOnInit() {

    // this.targetTask=this.data['target']
    // this.project=this.data['project']
    // this.tasklist=this.data['tasklist']
    // console.log(this.targetTask._id)
    // this.isCompleted=this.targetTask.task_isComplete;
    // this.taskContent=this.targetTask.task_title;
    // this.repeat=this.targetTask.task_repeat;
    // this.noti=this.targetTask.task_remind;
    // this.notesContent = this.targetTask.task_notes;
    if(this.data.target.task_prl==0){
      this.priorityNormal=false;
      this.priorityHigh=false;
      this.priorityMedium=false;

    }else if(this.data.target.task_prl==1){
      this.priorityNormal=true;
      this.priorityHigh=false;
      this.priorityMedium=false;
    }else if(this.data.target.task_prl==2){
       this.priorityMedium=true;
       this.priorityHigh=false;
       this.priorityNormal=false;
       
    }
    else if(this.data.target.task_prl==3){
       this.priorityHigh=true;
       this.priorityMedium=false;
       this.priorityNormal=false;

    }
    else{
      console.log("priority erro")
    }
    let id = new ObjectId();
    id = JSON.parse(JSON.stringify(this.data.target._id));
   this.taskId=id.$oid;

    this.freshTag();
    this.freshComments();
  }
  onNoClick(): void {
    this.dialogRef.close();


  }
  selectRepeat(){

  }
  selectNomalPriority(){
    this.priorityMedium=false;
    this.priorityHigh=false;
    this.priorityNormal=!this.priorityNormal
    if(this.priorityNormal){
       this.data.target.task_prl=1
    }
    else{
      this.data.target.task_prl=0
    }
  }
  selectMediumPriority(){
    this.priorityNormal=false;
    this.priorityHigh=false;
    this.priorityMedium=!this.priorityMedium
    if(this.priorityMedium){
      this.data.target.task_prl=2
     }else{
      this.data.target.task_prl=0
     }

  }
  selectHighPriority(){
    this.priorityNormal=false;
    this.priorityMedium=false;
    this.priorityHigh=!this.priorityHigh
    if(this.priorityHigh){
      this.data.target.task_prl=3
     }else{
    this.data.target.task_prl=0
     }

  }
  // Enter, comma

/**
 * edit of tags
 */


  freshTag() {
    this.tagService.getTags(this.taskId).subscribe(tags => {
      this.tags = tags;

      // console.log(`all task lists:${taskLists}`)
    });
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      let tag = new Tag()
      tag.tag_title=value;
      tag.task_id=this.taskId;
      this.tagService.addTask(tag).subscribe(addedTag=>{
        this.tags.push(addedTag);
      });

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: any): void {
    let index = this.tags.indexOf(tag);
    this.tagService.deleteTask(tag).subscribe(isSuccess => {
      if (isSuccess) {
        if (index >= 0) {
      this.tags.splice(index, 1);
    }
        } else {


      }
    })


  }
  freshComments(){
    this.taskCommentService.getComments(this.taskId).subscribe(comments => {
      this.comments = comments;

      // console.log(`all task lists:${taskLists}`)
    });
  }
  addComments(){
    let comment = new TaskComment();
    comment.comment_content=this.commentInput;
    comment.comment_time=new Date()
    comment.task_id=this.taskId;
    this.taskCommentService.addComment(comment).subscribe(addedcomment=>{
      this.comments.push(addedcomment);
      console.log(addedcomment.commenter)
    });


  }
  /**
 * operation of comments
 */
strings: string[] = [
  'stepper',
  'expansion-panel',
  'markdown',
  'highlight',
  'loading',
  'media',
  'chips',
  'http',
  'json-formatter',
  'pipes',
  'need more?',
];

filteredStackedStrings: string[];

stackedStringsModel: string[] = this.strings.slice(0, 2);

filterStackedStrings(value: string): void {
  this.filteredStackedStrings = this.strings.filter((item: any) => {
    if (value) {
      return item.toLowerCase().indexOf(value.toLowerCase()) > -1;
    } else {
      return false;
    }
  });
}
}

