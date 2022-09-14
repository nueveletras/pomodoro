import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pomodoro-settings',
  templateUrl: './pomodoro-settings.component.html'
})
export class PomodoroSettingsComponent {

  @Input() isLoading!: boolean
  @Input() focusTimeValue!: number
  @Input() breakValue!: number
  @Input() longBreakValue!: number
  @Input() roundsValue!: number
  @Output() save = new EventEmitter()

  saveSetting(){
    const settings = {
      focusTime: this.focusTimeValue,
      longBreak: this.longBreakValue,
      break: this.breakValue,
      rounds: this.roundsValue
    }
    this.save.emit(settings)
  }

}
