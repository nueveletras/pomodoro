import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SettingsComponent } from './settings.component';
import { PomodoroModule } from '../../pomodoro/pomodoro.module';
import { KnobModule } from 'primeng/knob';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    PomodoroModule,
    KnobModule,
    SkeletonModule,
    FormsModule,
  ]
})
export class SettingsModule { }
