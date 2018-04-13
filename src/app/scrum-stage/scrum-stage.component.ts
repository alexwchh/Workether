import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scrum-stage',
  templateUrl: './scrum-stage.component.html',
  styleUrls: ['./scrum-stage.component.css']
})
export class ScrumStageComponent implements OnInit {
  toggleDiv:boolean =true;
  constructor() { }

  ngOnInit() {
  }
  toggle():void{
     this.toggleDiv=!this.toggleDiv;
  }

}
