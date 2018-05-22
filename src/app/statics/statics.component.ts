import { Component, OnInit, ViewChild, Input,TemplateRef ,ElementRef} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormField, MatButton} from "@angular/material";
import { ProjectService } from "../project.service";
import { Project } from "../project";
@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.css']
})
export class StaticsComponent implements OnInit {
  projectId: string;
  projectName:string;
  project:Project;
  constructor(private activedRouter:ActivatedRoute,
  private projectService:ProjectService
  ) { }

  ngOnInit() {
    this.projectId = this.activedRouter.snapshot.paramMap.get("id");
    this.getProject();
  }
  getProject(){
this.projectService.getProject(this.projectId).subscribe(project=>{
this.projectName = project.project_name;
this.project = project;

})
  }

}
