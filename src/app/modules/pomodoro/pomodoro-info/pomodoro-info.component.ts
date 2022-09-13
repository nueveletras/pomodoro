import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pomodoro-info',
  templateUrl: './pomodoro-info.component.html',
  styleUrls: ['./pomodoro-info.component.css']
})
export class PomodoroInfoComponent implements OnInit {

  @Input() pomodoros: { icon: string, task: string }[] = []
  @Input() pomodorosCompleted: number = 0
  @Input() isTaskAdded: boolean = false
  @Input() taskNameValue!: string

  constructor() { }

  ngOnInit(): void {
  }

}
