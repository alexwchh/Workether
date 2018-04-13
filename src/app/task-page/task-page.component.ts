import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormField } from "@angular/material";
import { TasklistService } from "../tasklist.service";
import{TaskList} from "../task-list"
@Component({
  selector: "app-task-page",
  templateUrl: "./task-page.component.html",
  styleUrls: ["./task-page.component.css"]
})
export class TaskPageComponent implements OnInit {
  projectId: string;
  addedTasklist: string;
  taskLists:TaskList[];
  taskListOrders:Array<number>;
  
  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private tasklistService: TasklistService
  ) {
    this.projectId = this.activedRouter.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.taskLists = new Array<TaskList>()
  }
  addTasklist() {
      
      let taskList = new TaskList();
      taskList.task_list_title = this.addedTasklist;
      taskList.task_list_creatTime=Date.now();
      taskList.task_list_isActive = true;
      taskList.project_id=this.projectId;
      this.tasklistService.addTaskList(taskList)



  }
}
