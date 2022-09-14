import { Component, Input } from '@angular/core';
import { TaskModel } from '@task/models/task.model';

@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html'
})
export class TaskTableComponent {

  @Input()   tasks!: TaskModel[]
  @Input()   isLoading: boolean = false

}
