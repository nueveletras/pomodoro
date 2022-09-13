import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records.component';
import { SharedModule } from '@shared/shared.module';
import { TaskModule } from '../../task/task.module';


@NgModule({
  declarations: [
    RecordsComponent
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    SharedModule,
    TaskModule
  ]
})
export class RecordsModule { }
