import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html',
  styleUrls: ['./pomodoro-timer.component.css']
})
export class PomodoroTimerComponent implements OnInit {

  @Input() displayMinutes: number = 0
  @Input() displaySeconds: number = 0
  @Input() onCreate: boolean = false
  @Input() isOnBreak: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
