import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() isTaskAdded: boolean = false
  @Output() addTask = new EventEmitter()

  taskName = new FormControl('', [Validators.required, Validators.maxLength(15)])

  constructor() { }

  ngOnInit(): void {
  }

  addTaskEmmiter(){
    this.addTask.emit(this.taskName)
  }

}
