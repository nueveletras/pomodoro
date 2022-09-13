import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from '@task/models/task.model';

@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {

  @Input()   tasks!: TaskModel[]
  @Input()   isLoading: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
