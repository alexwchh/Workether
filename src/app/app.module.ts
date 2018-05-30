import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule }    from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component'; // <-- NgModel lives here
import {  HeroService} from "./hero.service";
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,

} from '@angular/material';
import 'hammerjs';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectService } from './project.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserService } from './user.service';
import { MainLoginService } from './main-login.service';
import { ProjectPageComponent } from './project-page/project-page.component';
import { CookieService } from 'ngx-cookie-service';
import { TasksComponent } from './tasks/tasks.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { ScrumStageComponent } from './scrum-stage/scrum-stage.component';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule  } from '@covalent/core/steps';
import { CovalentCommonModule } from '@covalent/core/common';
import { TasklistService } from './tasklist.service';
import { EditTaskListDialogComponent } from './edit-task-list-dialog/edit-task-list-dialog.component';
import { TaskService } from './task.service';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { SubtaskComponent } from './subtask/subtask.component';
import { SubtaskService } from './subtask.service';
import { SubtaskItemComponent } from './subtask-item/subtask-item.component';
import { CovalentChipsModule } from '@covalent/core/chips';
import {OverlayModule, Overlay, ScrollStrategyOptions} from '@angular/cdk/overlay';
import { SelectListOverlayComponent } from './select-list-overlay/select-list-overlay.component';
import { TagService } from './tag.service';
import{TaskCommentService} from "./task-comment.service"
import { CovalentDialogsModule } from '@covalent/core/dialogs';


import { AgendaPageComponent } from './agenda-page/agenda-page.component';
import { SharePageComponent } from './share-page/share-page.component';
import { CovalentExpansionPanelModule } from '@covalent/core/expansion-panel';
import { AgendaService } from './agenda.service';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { QuillModule } from 'ngx-quill';
import { EditArticleDialogComponent } from './edit-article-dialog/edit-article-dialog.component';
import { ShareService } from './share.service';
import { ShareCommentService } from './share-comment.service';
import { PortalModule, CdkPortalOutlet } from '@angular/cdk/portal';
import { CovalentNotificationsModule } from '@covalent/core/notifications';
import { CovalentMenuModule } from '@covalent/core/menu';
import { CovalentSearchModule } from '@covalent/core/search';
import { ProjectActorService } from './project-actor.service';
import { StaticsComponent } from './statics/statics.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

/* any other core modules */
// (optional) Additional Covalent Modules imports
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    NavbarComponent,
    AddProjectDialogComponent,
    LoginComponent,
    MainPageComponent,
    ProjectPageComponent,
    TasksComponent,
    TaskPageComponent,
    TabBarComponent,
    TaskItemComponent,
    ScrumStageComponent,
    EditTaskListDialogComponent,
    EditTaskDialogComponent,
    SubtaskComponent,
    SubtaskItemComponent,
    SelectListOverlayComponent,
    AgendaPageComponent,
    SharePageComponent,
    EditArticleDialogComponent,
    StaticsComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentCommonModule,
    CovalentChipsModule,
    CovalentDialogsModule,
    CovalentExpansionPanelModule,
    AngularDateTimePickerModule,
    CovalentTextEditorModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    QuillModule,
    PortalModule,
    CovalentSearchModule,
    NgxChartsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
    
    
  ],
  exports: [
    PortalModule,
    OverlayModule
  ],
  
  // The providers array tells Angular to create a single, 
  // shared instance of HeroService and inject into any class that asks for it.
  providers: [
    HeroService,
    MessageService,
    ProjectService,
    UserService,
    MainLoginService,
    CookieService,
    TasklistService,
    TaskService,
    SubtaskService,
    TagService,
    TaskCommentService,
    AgendaService,
    ShareService,
    ShareCommentService,
    ProjectActorService
  ],
  entryComponents:[
    AddProjectDialogComponent,
    EditTaskListDialogComponent,
    EditTaskDialogComponent,
    SelectListOverlayComponent,
    EditArticleDialogComponent
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
