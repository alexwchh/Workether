import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormField } from "@angular/material";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { EditArticleDialogComponent } from "../edit-article-dialog/edit-article-dialog.component";
import { TasklistService, TaskOrder } from "../tasklist.service";
import { TaskList } from "../task-list";
import { puts } from "util";
import { Project } from "../project";
import { ViewContainerRef } from "@angular/core";
import { TdDialogService } from "@covalent/core/dialogs";
import { Task } from "../task";
import { TdTextEditorComponent } from "@covalent/text-editor";
import { ShareService } from "../share.service";
import { Share } from "../share";
import { ObjectId, TagService } from "../tag.service";
import { ShareCommentService } from "../share-comment.service";
import { ShareComment } from "../share_comment";
@Component({
  selector: "app-share-page",
  templateUrl: "./share-page.component.html",
  styleUrls: ["./share-page.component.css"]
})
export class SharePageComponent implements OnInit {
  @ViewChild("textEditor") private _textEditor: TdTextEditorComponent;
  @ViewChild("textEditorPre") private _textEditorPre: TdTextEditorComponent;

  projectId: string;
  project: Project;
  projectName:string;
  date: Date = new Date();
  events = [];
  opened: boolean;
  commentInput: string;
  comments: ShareComment[] = new Array<ShareComment>();
  selectedShare: Share;
  selectedText: string;
  selectedTitle: string;
  selectedShareId: string;
  shares: Share[] = new Array<Share>();
  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private tasklistService: TasklistService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public editDialog: MatDialog,
    private shareService: ShareService,
    private shareCommentService: ShareCommentService
  ) {
    this.projectId = this.activedRouter.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.freshSharesAndSelectFisrt();
    this.opened = false;
    console.log("sadfasdfasdfasdgds");
  }
  ngAfterViewInit(): void {
    // this._textEditorPre.togglePreview();
  }
  toggleSideNav() {
    this.opened = !this.opened;
  }
  selectShare(share: Share) {
    this.selectedShare = share;
    this.selectedText = share.share_content;
    let id = new ObjectId();
    id = JSON.parse(JSON.stringify(share._id));
    this.selectedShareId = id.$oid;
    this.selectedTitle=share.share_title;
    this.freshComments(this.selectedShareId);
    // this._textEditorPre.value=share;
    // if(!this._textEditorPre.isPreviewActive()){

    //   this._textEditorPre.togglePreview();

    // }
  }
  selectFirstShare() {
    this.selectedShare = this.shares[0];
    this.selectedText = this.selectedShare.share_content;
    this.selectedTitle=this.selectedShare.share_title;
    let id = new ObjectId();
    id = JSON.parse(JSON.stringify(this.selectedShare._id));
    this.selectedShareId = id.$oid;
    this.freshComments(this.selectedShareId);
    // this._textEditorPre.value=share;
    // if(!this._textEditorPre.isPreviewActive()){

    //   this._textEditorPre.togglePreview();

    // }
  }

  addShare(share: Share) {
    share.project_id = this.projectId;

    this.shareService.addShare(share).subscribe(addedTasklist => {
      console.log("a new tasklist created"),
        console.log(addedTasklist),
        //this.freshTaskList()
        this.shares.push(addedTasklist),
        this.freshSharesAndSelectFisrt();
        console.log(this.shares);
    });
  }
  updateShare(share: Share) {
    this.shareService.updateShare(share).subscribe(isSuccess => {
      this.freshShares()});
   this.selectShare(share);
    }
  deleteArticle(){
    this.shareService.deleteShare(this.selectedShare).subscribe(isSucess=>{
      this.freshSharesAndSelectFisrt();
    })
    
  }
  editArticle(){
   this.openArticleEditDialog(this.selectedShare);
  }
  freshShares(){
    this.shareService.getShares(this.projectId).subscribe(resultArray => {
      // this.taskLists = taskLists;
      this.shares = resultArray["shares"];
      this.project = resultArray["project"];
     this.projectName=this.project.project_name;
      //get lists form database and sort by tasklist order
      //console.log(taskLists);
      // console.log(`all task lists:${taskLists}`)
    });
  }
  freshSharesAndSelectFisrt() {
    this.shareService.getShares(this.projectId).subscribe(resultArray => {
      // this.taskLists = taskLists;
      this.shares = resultArray["shares"];
      this.project = resultArray["project"];
      this.projectName=this.project.project_name;
      //get lists form database and sort by tasklist order
      this.selectFirstShare();
      //console.log(taskLists);
      // console.log(`all task lists:${taskLists}`)
    });
  }
  openArticleEditDialog(selectedShare:Share ) {
    event.stopPropagation();
    let dialogRef = this.editDialog.open(EditArticleDialogComponent, {
      panelClass: "myapp-no-padding-dialog",
      maxWidth: "none",
      width: "100%",
      height: "100%",
      data: { project: this.project, share: selectedShare,isEdit:true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (
        selectedShare.share_title.length == 0 &&
        selectedShare.share_content.length == 0
      ) {
      } else {
        this.updateShare(selectedShare);
      }

      console.log("The dialog was closed");
      // this.tasklist.task_list_title = result;
      // this.onEditReq();
    });
  }
  openArticleAddDialog(event: any) {
    event.stopPropagation();
    let added_share = new Share();
    let dialogRef = this.editDialog.open(EditArticleDialogComponent, {
      panelClass: "myapp-no-padding-dialog",
      maxWidth: "none",
      width: "100%",
      height: "100%",
      data: { project: this.project, share: added_share,isEdit:false}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (
        added_share.share_title.length == 0 &&
        added_share.share_content.length == 0
      ) {
      } else {
        this.addShare(added_share);
      }

      console.log("The dialog was closed");
      // this.tasklist.task_list_title = result;
      // this.onEditReq();
    });
  }
  freshComments(shareId: string) {
    this.shareCommentService.getComments(shareId).subscribe(comments => {
      this.comments = comments;

      // console.log(`all task lists:${taskLists}`)
    });
  }
  addComments() {
    let comment = new ShareComment();
    comment.comment_content = this.commentInput;
    comment.comment_time = new Date();
    comment.share_id = this.selectedShareId;
    this.shareCommentService.addComment(comment).subscribe(addedcomment => {
      this.comments.push(addedcomment);
      console.log(addedcomment.commenter);
    });
  }
}
