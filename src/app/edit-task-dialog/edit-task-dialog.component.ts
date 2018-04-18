import { Component, OnInit,Inject } from '@angular/core';
import {TasklistService} from '../tasklist.service'
import { TaskList } from '../task-list';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Task } from '../task';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {
  targetTask:Task
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  selectedDate: Date = new Date();
  separatorKeysCodes = [ENTER, COMMA];
  constructor(public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService:TasklistService) { }

  ngOnInit() {
    this.targetTask=this.data['target']
    console.log(this.targetTask._id)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  editTaskList(){
    
    this.dialogRef.close();
  }
  

  // Enter, comma
 
/**
 * edit of tags
 */
  fruits = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];


  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    let index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  /**
 * operation of comments
 */
strings: string[] = [
  'stepper',
  'expansion-panel',
  'markdown',
  'highlight',
  'loading',
  'media',
  'chips',
  'http',
  'json-formatter',
  'pipes',
  'need more?',
];

filteredStackedStrings: string[];

stackedStringsModel: string[] = this.strings.slice(0, 2);

filterStackedStrings(value: string): void {
  this.filteredStackedStrings = this.strings.filter((item: any) => {
    if (value) {
      return item.toLowerCase().indexOf(value.toLowerCase()) > -1;
    } else {
      return false;
    }
  });
}
}

