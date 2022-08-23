import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  userRecordsString: string = localStorage.getItem("userRecords") as string
  tasks: TaskModel[] = JSON.parse(this.userRecordsString)
  constructor() { }

  ngOnInit(): void {
  }

}
