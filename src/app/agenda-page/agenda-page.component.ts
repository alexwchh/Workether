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
import {MatExpansionModule,MatExpansionPanel} from '@angular/material/expansion';
@Component({
  selector: 'app-agenda-page',
  templateUrl: './agenda-page.component.html',
  styleUrls: ['./agenda-page.component.css']
})
export class AgendaPageComponent implements OnInit {
  projectId: string;
  @ViewChild("expd") child:MatExpansionPanel
  constructor( private router: Router,
    private activedRouter: ActivatedRoute,
    private tasklistService: TasklistService,) { 
    
    this.projectId = this.activedRouter.snapshot.paramMap.get("id");
  }

  ngOnInit() {
  }
  closePanel(){
    this.child.close()
  }

}
