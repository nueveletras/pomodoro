import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastModule
  ],
  exports:[
    ToastModule,
    ButtonModule
  ]
})
export class SharedModule { }
