import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import{LoginComponent} from './login/login.component'
import {MainPageComponent  } from "./main-page/main-page.component";
import { TasksComponent } from "./tasks/tasks.component";
import {  TaskPageComponent} from "./task-page/task-page.component";
import { ProjectPageComponent } from "./project-page/project-page.component";
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },

  {path: 'login',component:LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'projects', component: MainPageComponent},
  {path: 'projects/:id/tasklists', component: TaskPageComponent},
  // children:[
  //   {path: 'projects', component: ProjectPageComponent,outlet:'projectPage'}, 
  //   {path: 'project-detail/:id', component: ProjectDetailComponent,outlet:'projectPage'}, ]
  
  

];
@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule {
  
}