import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {

  @Input() isTaskAdded: boolean = false
  @Output() addPomodoro = new EventEmitter()

  taskName = new FormControl('', [Validators.required, Validators.maxLength(15)])

  addPomodoroEmmiter(){
    this.addPomodoro.emit(this.taskName)
  }

}
