import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  projectId:string
  constructor(private router:Router,
  private activedRouter:ActivatedRoute) { 
    this.projectId = this.activedRouter.snapshot.paramMap.get('id')
  }


  ngOnInit() {
  }

}
