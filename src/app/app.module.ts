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
    ScrumStageComponent
    
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
  ],
  // The providers array tells Angular to create a single, 
  // shared instance of HeroService and inject into any class that asks for it.
  providers: [
    HeroService,
    MessageService,
    ProjectService,
    UserService,
    MainLoginService,
    CookieService
  ],
  entryComponents:[
    AddProjectDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
