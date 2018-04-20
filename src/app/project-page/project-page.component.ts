import { Component, OnInit } from "@angular/core";
import { ProjectService, ObjectId } from "../project.service";
import { Project } from "../project";
import { MainLoginService } from "../main-login.service";
import { User } from "../user";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
@Component({
  selector: "app-project-page",
  templateUrl: "./project-page.component.html",
  styleUrls: ["./project-page.component.scss"]
})
export class ProjectPageComponent implements OnInit {
  projects: Project[];
  activeProjects: Project[];
  starredProjects: Project[];
  deletedProjects: Project[];
  selectedProject: Project;
  user: User;
  showDltChecked: boolean;
  showDltdisabled: boolean;
  constructor(
    private projectService: ProjectService,
    private loginService: MainLoginService,
    private cookiesService: CookieService,
    private router: Router
  ) {
    this.projects = new Array<Project>();
    this.activeProjects = new Array<Project>();
    this.starredProjects = new Array<Project>();
    this.deletedProjects = new Array<Project>();
    this.loginService.loggedAnnounced$.subscribe(user => {
      (this.user = user), console.log(user._id);
    });
    //get added project
    this.projectService.projectAdded$.subscribe(project => {
      //  let projectOperation = new ProjectOperation(this.user,project);
      this.projectService.addProject(project).subscribe(addedproject => {
        this.freshProjects();
        console.log(addedproject)
        console.log(addedproject.isStarred);
      });
    });
  }

  ngOnInit() {
    this.freshProjects();
    //cannot update here cuz freshproject is an async operation
    // this.getStarredProjects()
    // this.getdeletedProjects()
  }
  freshProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.initProjects();
      for (let project of projects) {
        if (project.isActive) {
          if (project.isStarred) {
            this.starredProjects.push(project);
          }
          this.activeProjects.push(project);
        } else {
          this.deletedProjects.push(project);
        }
        // console.log( project._id);

        //console.log(id.$oid);
        // console.log("isStarred:");
        // console.log(project.isStarred);
        // console.log(project._id);
      }

      //this.getStarredProjects();
      //this.getdeletedProjects();
    });
  }
  initProjects() {
    this.activeProjects = null;
    this.activeProjects = new Array<Project>();
    this.starredProjects = null;
    this.starredProjects = new Array<Project>();
    this.deletedProjects = null;
    this.deletedProjects = new Array<Project>();
  }
  getStarredProjects() {
    this.starredProjects = null;
    this.starredProjects = new Array<Project>();
    for (let project of this.projects) {
      if (project.isStarred && project.isActive) {
        this.starredProjects.push(project);
      }
    }
  }
  getdeletedProjects() {
    this.deletedProjects = null;
    this.deletedProjects = new Array<Project>();
    for (let project of this.projects) {
      if (!project.isActive) {
        console.log(`deleted project:${project.project_name}`);
        this.deletedProjects.push(project);
      }
    }
  }
  /** project operate
   * onAndOffStarred
   * onDelete
   * onEdit
   */
  onAndOffStarred(event:any,project: Project) {
    event.stopPropagation();
    project.isStarred = !project.isStarred;
    this.projectService.updateProject(project).subscribe(isSuccess => {
      if (isSuccess) {
        console.log(`${project.project_name} has been successfully starred`);
        this.freshProjects();
      } else {
        console.log(`${project.project_name} starring has failed`);
      }
    });
  }
  onDelete(event:any,project: Project) {
    event.stopPropagation();
    project.isActive = !project.isActive;
    this.projectService.updateProject(project).subscribe(isSuccess => {
      if (isSuccess) {
        console.log(`${project.project_name} has been successfully deleted`);
        this.freshProjects();
      } else {
        console.log(`${project.project_name} deletion has failed`);
      }
    });
  }
  onDestroy(project: Project) {
    this.projectService.deleteProject(project).subscribe(isSuccess => {
      if (isSuccess) {
        console.log(`${project.project_name} has been successfully destroyed`);
        this.freshProjects();
      } else {
        console.log(`${project.project_name} destroy has failed`);
      }
    });
  }
  onNavigate(event: any, project: Project) {
    event.stopPropagation();

    let id = this.objectIdToStr(project._id);
    this.router.navigateByUrl(`projects/${id.$oid}/tasklists`);
    // let url=  this.router.createUrlTree(['/mainpage',{outlets:{projectDetail:`project-detail/${id.$oid}`}}])
    //  this.router.navigateByUrl(url)
  }
  objectIdToStr(objectId: any): ObjectId {
    let id = new ObjectId();
    id = JSON.parse(JSON.stringify(objectId));
    return id;
  }
}
export class ProjectOperation {
  constructor(isSuccess: boolean, project: Project) {}
}
