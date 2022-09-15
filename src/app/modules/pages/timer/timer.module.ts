import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerRoutingModule } from './timer-routing.module';
import { TaskModule } from '../../task/task.module';
import { PomodoroModule } from '../../pomodoro/pomodoro.module';
import { SharedModule } from '@shared/shared.module';
import { TimerComponent } from './timer.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    TimerComponent
  ],
  imports: [
    CommonModule,
    TimerRoutingModule,
    TaskModule,
    PomodoroModule,
    ConfirmDialogModule,
    SharedModule
  ]
})
export class TimerModule { }
