import { Component, Input } from '@angular/core';

@Component({
  selector: 'pomodoro-info',
  templateUrl: './pomodoro-info.component.html'
})
export class PomodoroInfoComponent {

  @Input() pomodoros: { icon: string, task: string }[] = []
  @Input() pomodorosCompleted: number = 0
  @Input() isTaskAdded: boolean = false
  @Input() taskNameValue!: string

}
