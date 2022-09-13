import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TaskTableComponent } from './task-table/task-table.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    TaskFormComponent,
    TaskTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule
  ],
  exports: [
    TaskFormComponent,
    TaskTableComponent
  ]
})
export class TaskModule { }
