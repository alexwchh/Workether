import { Component, OnInit,Input } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {
  @Input() public projectId:string
  @Input() public projectName:string
  taskUrl:string
  agendaUrl:string
  shareUrl:string
  constructor(private router:Router) { 
    
  }

  ngOnInit() {
    this.taskUrl = `/projects/${this.projectId}/tasklists` 
    this.agendaUrl= `/projects/${this.projectId}/agendas`
    this.shareUrl = `/projects/${this.projectId}/shares`
  }
  navToHome()
{
  this.router.navigateByUrl('/projects')
}
}
