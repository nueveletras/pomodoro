import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pomodoro-settings',
  templateUrl: './pomodoro-settings.component.html',
  styleUrls: ['./pomodoro-settings.component.css']
})
export class PomodoroSettingsComponent implements OnInit {

  @Input() isLoading!: boolean
  @Input() focusTimeValue!: number
  @Input() breakValue!: number
  @Input() longBreakValue!: number
  @Input() roundsValue!: number
  @Output() save = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  saveSetting(){

  }

}
