import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PomodoroInfoComponent } from './pomodoro-info/pomodoro-info.component';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { PomodoroTimerComponent } from './pomodoro-timer/pomodoro-timer.component';
import { FieldsetModule } from 'primeng/fieldset';
import { PomodoroSettingsComponent } from './pomodoro-settings/pomodoro-settings.component';
import { KnobModule } from 'primeng/knob';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    PomodoroInfoComponent,
    PomodoroTimerComponent,
    PomodoroSettingsComponent
  ],
  imports: [
    CommonModule,
    ChipModule,
    BadgeModule,
    FieldsetModule,
    AvatarModule,
    KnobModule,
    SkeletonModule,
    FormsModule,
    SharedModule
  ],
  exports:[
    PomodoroInfoComponent,
    PomodoroTimerComponent,
    PomodoroSettingsComponent

  ]
})
export class PomodoroModule { }
