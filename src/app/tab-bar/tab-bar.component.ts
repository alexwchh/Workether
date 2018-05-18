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
  MatFormField
} from "@angular/material";
import {
  PortalOutlet,
  CdkPortal,
  Portal,
  CdkPortalOutlet,
  TemplatePortal
} from "@angular/cdk/portal";
import { OverlayModule, Overlay, OverlayRef } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import {MatFormFieldModule} from '@angular/material/form-field';
import {  UserService} from "../user.service";
import { User } from "../user";
@Component({
  selector: "app-tab-bar",
  templateUrl: "./tab-bar.component.html",
  styleUrls: ["./tab-bar.component.css"]
})
export class TabBarComponent implements OnInit{
  @ViewChild("por") private navPortal: CdkPortalOutlet;

  @Input() public projectId: string;
  @Input() public projectName: string;
  @ViewChildren(CdkPortal) templatPortals: QueryList<CdkPortal>;
  @ViewChild("overlayMenuList") overlayMenuList: TemplateRef<any>;
  @ViewChild("overlayUserList") overlayUserList: TemplateRef<any>;
  @ViewChild("originFab") originFab: MatButton;
  @ViewChild("addUserButton") addUserButton: MatButton;
  
  // @ViewChild('template') template3: TemplateRef<any>;
  currentPortal: Portal<any>;
  taskUrl: string;
  agendaUrl: string;
  shareUrl: string;
  overlayRef: OverlayRef;
  addUserOverlayRef:OverlayRef;
  users:User[] = new Array<User>()
  constructor(
    private router: Router,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private elRef: ElementRef,
    private userService:UserService
  ) // private viewContainerRef: ViewContainerRef
  {}

  ngOnInit() {
    this.taskUrl = `/projects/${this.projectId}/tasklists`;
    this.agendaUrl = `/projects/${this.projectId}/agendas`;
    this.shareUrl = `/projects/${this.projectId}/shares`;

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
    const strategy = this.overlay
      .position()
      .connectedTo(
        this.addUserButton._elementRef,
        { originX: "end", originY: "bottom" },
        { overlayX: "end", overlayY: "top" }
      );
    
    this.addUserOverlayRef = this.overlay.create({
      positionStrategy: strategy,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      panelClass: "myapp-side-add-user-overlay"
    });
    
  }
  displayAddUserOverlay(){
    if (this.addUserOverlayRef && this.addUserOverlayRef.hasAttached()) {
      this.addUserOverlayRef.dispose();
    } else {
      this.createUserNameOverlay();
      this.addUserOverlayRef.attach(
        new TemplatePortal(this.overlayUserList, this.viewContainerRef));
        this.getAllUsers();
        
      
    }
      }
  disposeAddUserOverlay(){
    if (this.addUserOverlayRef && this.addUserOverlayRef.hasAttached()) {
      this.addUserOverlayRef.dispose();
    } 
  }
    
  displayMenu() {
    this.disposeAddUserOverlay()
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
    } else {
      this.createRightNavOverlay();
      this.overlayRef.attach(
        new TemplatePortal(this.overlayMenuList, this.viewContainerRef)
      );
      // this.overlayRef.attach(this.templatPortals.last);
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
  getAllUsers(){
    this.userService.getUsers().subscribe(users=>{
      this.users = users
      console.log(this.users)
    })

  }
}
