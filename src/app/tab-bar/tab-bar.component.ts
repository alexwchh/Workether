import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  Input,
  QueryList,
  NgModule,
  TemplateRef,
  ViewContainerRef,
  ElementRef
} from "@angular/core";
import { Router } from "@angular/router";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatButton,
  MatFormField,
  MatList
} from "@angular/material";
import { MatListModule, MatSelectionList } from "@angular/material/list";
import {
  PortalOutlet,
  CdkPortal,
  Portal,
  CdkPortalOutlet,
  TemplatePortal
} from "@angular/cdk/portal";
import {
  OverlayModule,
  Overlay,
  OverlayRef,
  ScrollStrategy
} from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { MatFormFieldModule } from "@angular/material/form-field";
import { UserService } from "../user.service";
import { ObjectId } from "../agenda.service";
import { User } from "../user";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";
import { ProjectActorService } from "../project-actor.service";
import { ProjectActor } from "../project-actor";
import { AbstractControl } from "@angular/forms";
import { Project } from "../project";
@Component({
  selector: "app-tab-bar",
  templateUrl: "./tab-bar.component.html",
  styleUrls: ["./tab-bar.component.css"]
})
export class TabBarComponent implements OnInit {
  @ViewChild("por") private navPortal: CdkPortalOutlet;

  @Input() public projectId: string;
  @Input() public projectName: string;
  @ViewChildren(CdkPortal) templatPortals: QueryList<CdkPortal>;
  @ViewChild("overlayMenuList") overlayMenuList: TemplateRef<any>;
  @ViewChild("overlayUserList") overlayUserList: TemplateRef<any>;
  @ViewChild("originFab") originFab: MatButton;
  @ViewChild("addUserButton") addUserButton: MatButton;
  @ViewChild("usersList") usersList: MatSelectionList;

  // @ViewChild('template') template3: TemplateRef<any>;
  currentPortal: Portal<any>;
  taskUrl: string;
  agendaUrl: string;
  shareUrl: string;
  overlayRef: OverlayRef;
  addUserOverlayRef: OverlayRef;
  users: User[] = new Array<User>();
  searchUserResult: User[] = new Array<User>();
  isSearchResultEmpty: boolean;
  typesOfShoes = ["Boots", "Clogs", "Loafers", "Moccasins", "Sneakers"];
  searchInputTerm: string;
  isShowPanelHeader: boolean = true;
  projectActors: ProjectActor[] = new Array<ProjectActor>();
  project: Project;
  projectOwner:User;
  constructor(
    private router: Router,
    private overlay: Overlay,
    private overlayUser: Overlay,
    private viewContainerRef: ViewContainerRef,
    private elRef: ElementRef,
    private userService: UserService, // private viewContainerRef: ViewContainerRef
    private projectActorService: ProjectActorService
  ) {}

  ngOnInit() {
    this.taskUrl = `/projects/${this.projectId}/tasklists`;
    this.agendaUrl = `/projects/${this.projectId}/agendas`;
    this.shareUrl = `/projects/${this.projectId}/shares`;
    this.isSearchResultEmpty = false;
    this.isShowPanelHeader = true;
    this.getALLProjectActor();
    // this.getProjectOwner()
    // this.createRightNavOverlay();
    // this.createUserNameOverlay();
  }
  createRightNavOverlay() {
    const globalStragedy = this.overlay
      .position()
      .global()
      .right();
    //overlayRef is a PortalOutlet
    this.overlayRef = this.overlay.create({
      positionStrategy: globalStragedy,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      panelClass: "myapp-side-overlay"
    });
  }
  createUserNameOverlay() {
    const globalStragedy = this.overlayUser
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const strategy = this.overlayUser
      .position()
      .connectedTo(
        this.addUserButton._elementRef,
        { originX: "end", originY: "bottom" },
        { overlayX: "end", overlayY: "top" }
      );

    this.addUserOverlayRef = this.overlayUser.create({
      positionStrategy: globalStragedy,
      hasBackdrop: true,
      backdropClass: "cdk-overlay-transparent-backdrop",
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: "myapp-side-add-user-overlay"
    });
    this.addUserOverlayRef.backdropClick().subscribe(() => {
      this.addUserOverlayRef.detach();
    });
  }
  displayAddUserOverlay() {
    if (this.addUserOverlayRef && this.addUserOverlayRef.hasAttached()) {
      this.addUserOverlayRef.dispose();
    } else {
      this.createUserNameOverlay();
      this.addUserOverlayRef.attach(
        new TemplatePortal(this.overlayUserList, this.viewContainerRef)
      );
      this.getAllSearchUsers();
    }
  }
  disposeAddUserOverlay() {
    if (this.addUserOverlayRef && this.addUserOverlayRef.hasAttached()) {
      this.addUserOverlayRef.dispose();
    }
  }

  displayMenu() {
    this.disposeAddUserOverlay();
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
    } else {
      this.createRightNavOverlay();
      this.overlayRef.attach(
        new TemplatePortal(this.overlayMenuList, this.viewContainerRef)
      );
      // this.overlayRef.attach(this.templatPortals.last);
      // this.getALLProjectActor();
    }
  }

  navToHome() {
    this.router.navigateByUrl("/projects");
  }
  openNavPortal() {
    // const overlayRef = this.overlay.create({
    //   height: '400px',
    //   width: '600px',
    // })
    // overlayRef.attach(this.navPortal);
    this.templatPortals.first.context = { nameInObject: "wang" };
    this.currentPortal = this.templatPortals.first;
    // this.currentPortal = new TemplatePortal(this.template3, this.viewContainerRef);
  }
  getAllSearchUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      console.log(this.users);
      this.searchUserResult = new Array<User>();
      // this.searchUserResult = JSON.parse(JSON.stringify(this.users));
      // console.log(this.searchUserResult);

      for (let user of this.users) {
        let userId = new ObjectId();
        userId = JSON.parse(JSON.stringify(user._id));
        let isPass = true;
        for (let projectActor of this.projectActors) {
          let actorId = new ObjectId();
          actorId = JSON.parse(JSON.stringify(projectActor.user_id));

          if (actorId.$oid == userId.$oid) {
            isPass = false;
          }
        }
        let projectOwner = new ObjectId();
        projectOwner = JSON.parse(JSON.stringify(this.project.user_id));
        if (userId.$oid == projectOwner.$oid) {
          isPass = false;
        }
        if (isPass) {
          this.searchUserResult.push(user);
        }
      }
    });
  }

  searchUsers($event) {
    this.searchUserResult = this.users.filter(this.userFiler, this);
    if (this.searchUserResult.length == 0) {
      this.isSearchResultEmpty = true;
    } else {
      this.isSearchResultEmpty = false;
    }
    //this.isShowPanelHeader=false;
    console.log(this.searchInputTerm);
  }
  userFiler(user: User) {
    if (
      user.name.includes(this.searchInputTerm) ||
      user.email.includes(this.searchInputTerm)
    ) {
      return user;
    }
  }
  onSearchInputClear($event) {
    if (this.searchUserResult.length == 0) {
      this.isSearchResultEmpty = true;
    } else {
      this.isSearchResultEmpty = false;
    }
    this.searchUserResult = this.users;
    //this.isShowPanelHeader=true;
  }
  togglePanelHeader() {
    this.isShowPanelHeader = !this.isShowPanelHeader;
  }
  onAddUser() {
    let userid = new ObjectId();
    let selectedUser = new User();
    let projectActors = new Array<ProjectActor>();
    for (let userOption of this.usersList.selectedOptions.selected) {
      selectedUser = userOption.value;
      userid = JSON.parse(JSON.stringify(selectedUser._id));
      console.log(userOption.value);
      console.log(selectedUser);
      let actor = new ProjectActor();
      actor.project_id = this.projectId;
      actor.user_id = userid.$oid;
      actor.email = selectedUser.email;
      actor.user_name = selectedUser.name;
      this.projectActorService.addProjectActor(actor).subscribe(isSucesss => {
        this.projectActors.push(actor);
        this.getALLProjectActor();
      });
      // projectActors.push(actor);
    }
    // let projectActorsJson = {project_actors:projectActors};
    //   this.projectActorService.addProjectActorGroup(projectActorsJson,this.projectId).subscribe(isSucesss=>{

    //  });
  }
  getALLProjectActor() {
    this.projectActorService
      .getProjectActors(this.projectId)
      .subscribe(result => {
        this.projectActors = result["project_actors"];
        this.project = result["project"];
        // 获取任务所有者
        this.userService.getUserById
        console.log(this.projectActors);
        this.getProjectOwner()
      });
  }
  
  getProjectOwner(){
    let userTmp= new User();
    this.userService.getUserById(this.getObjectIdStr(this.project.user_id).$oid).subscribe(user=>{
     this.projectOwner = user;
     
    })

  }
  getObjectIdStr(objectID:any):ObjectId{
    let id = new ObjectId()
    id = JSON.parse(JSON.stringify(objectID));
    return id;
  }
}
