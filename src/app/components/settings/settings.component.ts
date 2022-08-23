import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  focusTimeValue: number = 25
  longBreakValue: number = 25
  breakValue: number = 15
  roundsValue: number = 4

  constructor() { }

  ngOnInit(): void {
  }

}
