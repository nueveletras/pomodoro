import { Component, Input } from '@angular/core';

@Component({
  selector: 'pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html'
})
export class PomodoroTimerComponent {

  @Input() displayMinutes: number = 0
  @Input() displaySeconds: number = 0
  @Input() onCreate: boolean = false
  @Input() isOnBreak: boolean = false

}
