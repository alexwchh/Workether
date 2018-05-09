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
@Component({
  selector: "app-task-page",
  templateUrl: "./task-page.component.html",
  styleUrls: ["./task-page.component.css"]
})
export class TaskPageComponent implements OnInit {
  projectId: string;
  project:Project;
  projectName:string;
  addedTasklist: string;
  taskLists: TaskList[];
  taskListOrders: Array<TaskOrder>;

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
    this.freshTaskList();
  }
  updateOrder() {
    for (let i in this.taskLists) {
      this.taskLists[i].task_list_order = Number(i);
    }
    this.tasklistService
      .updateTaskListOrder(this.taskLists)
      .subscribe(isSuccess => {
        if (isSuccess) {
          console.log(`order has been successfully modified`);

          //this.freshTaskList();
        } else {
          console.log(`order modifying has failed`);
        }
      });
  }
  sortList() {
    let by = function(name) {
      return function(o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
          a = o[name];
          b = p[name];
          if (a === b) {
            return 0;
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1;
          }
          return typeof a < typeof b ? -1 : 1;
        } else {
          throw "error";
        }
      };
    };
    this.taskLists.sort(by("task_list_order"));
  }
  addTasklist() {
    let taskList = new TaskList();
    taskList.task_list_title = this.addedTasklist;
    taskList.task_list_creatTime = new Date();
    taskList.task_list_isActive = true;
    taskList.project_id = this.projectId;
    taskList.task_list_order = this.taskLists.length + 1;

    this.tasklistService.addTaskList(taskList).subscribe(addedTasklist => {
      console.log("a new tasklist created"),
        console.log(addedTasklist),
        //this.freshTaskList()
        this.taskLists.push(addedTasklist),
        console.log(this.taskLists);
    });
  }
  onAddAfter(data: any) {
    let taskList = new TaskList();
    taskList.task_list_title = data[0];
    taskList.task_list_creatTime = new Date();
    taskList.task_list_isActive = true;
    taskList.project_id = this.projectId;
    taskList.task_list_order = this.taskLists.length + 1;
    this.tasklistService.addTaskList(taskList).subscribe(addedTasklist => {
      console.log("a new tasklist created"),
        //console.log(taskList),
        //this.freshTaskList()
        //create不能返回id的解决办法，但是push和更新可以，所以可以先push，然后更新，之后仔进行操作
        this.taskLists.push(addedTasklist),
        this.taskLists.splice(
          data[1] + 1,
          0,
          this.taskLists[this.taskLists.length - 1]
        ),
        this.taskLists.pop(),
        this.updateOrder();
      //  this.freshListForOrder(data),
        console.log(this.taskLists);
      // this.updateOrder()
    });
  }
  /**
   * cuz http get cannot sent back id, so i have to push it to the tasklist Array first
   * which can get id reference,
   */
  //为解决不能返回id的问题专门写的
  freshListForOrder(data: any) {
    this.tasklistService.getTaskLists(this.projectId).subscribe(taskLists => {
      this.taskLists = taskLists;
      this.sortList();
      console.log(taskLists);
      this.taskLists.splice(
        data[1] + 1,
        0,
        this.taskLists[this.taskLists.length - 1]
      ),
        this.taskLists.pop(),
        console.log(this.taskLists);
        this.updateOrder();
      // console.log(`all task lists:${taskLists}`)
    });
  }
  onEdit(tasklist: TaskList) {
    //tasklist.task_list_title="cheng"
    this.tasklistService.updateTaskList(tasklist).subscribe(isSuccess => {
      if (isSuccess) {
        console.log(
          `${tasklist.task_list_title} has been successfully modified`
        );

        //this.freshTaskList();
      } else {
        console.log(`${tasklist.task_list_title} modifying has failed`);
      }
    });
  }
  /**
   * 
   * @param tasklist 
   * delete a list from database,and update the new order to data base
   */
  onDestroy(tasklist: TaskList) {
    // this.tasklistService.deleteTaskList(tasklist).subscribe(isSuccess => {
    //   if (isSuccess) {
    //     console.log(
    //       `${tasklist.task_list_title} has been successfully destroyed`
    //     );
    //     this.taskLists.splice(this.taskLists.indexOf(tasklist), 1);
    //     this.updateOrder();
    //     //this.freshTaskList();
    //   } else {
    //     console.log(`${tasklist.task_list_title} de
    //       stroy has failed`);
    //   }
    // });
    this.openDelete(tasklist)
  }
  onDestroyDialog(tasklist: TaskList){
    this.tasklistService.deleteTaskList(tasklist).subscribe(isSuccess => {
      if (isSuccess) {
        console.log(
          `${tasklist.task_list_title} has been successfully destroyed`
        );
        this.taskLists.splice(this.taskLists.indexOf(tasklist), 1);
        this.updateOrder();
        //this.freshTaskList();
      } else {
        console.log(`${tasklist.task_list_title} de
          stroy has failed`);
      }
    });
  }
  
  openDelete(tasklist: TaskList): void {
    this._dialogService.openConfirm({
      message: 'This operation is irreversible, are you sure to delete?',
       // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Delete', //OPTIONAL, hides if not provided
      cancelButton: 'Cancel', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Delete', //OPTIONAL, defaults to 'ACCEPT'
      width: '450px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.onDestroyDialog(tasklist);
      } else {
        // DO SOMETHING ELSE
      }
    });
  }
  /**
   * get lists form database and sort by tasklist order
   */
  freshTaskList() {
    this.tasklistService.getTaskLists(this.projectId).subscribe(resultArray => {
      // this.taskLists = taskLists;
      this.taskLists = resultArray["task_lists"]
      this.project=resultArray["project"];
      this.projectName =this.project.project_name;
      //get lists form database and sort by tasklist order
      this.sortList();
      //console.log(taskLists);
      // console.log(`all task lists:${taskLists}`)
    });
  }
}
