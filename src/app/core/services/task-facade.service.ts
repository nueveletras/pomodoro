import { Injectable } from '@angular/core';
import { CR } from '../interfaces/cr-inteface.interface';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskFacadeService implements CR<TaskModel> {

  constructor() { }
  search(): void {
    throw new Error('Method not implemented.');
  }
  getAll(): TaskModel[] {
    throw new Error('Method not implemented.');
  }
  create(task: TaskModel): void {
    let userRecordsString: string = localStorage.getItem("userRecords") as string
    let userRecords: TaskModel[] = userRecordsString ? JSON.parse(userRecordsString) : []
    userRecords.push(task)

    localStorage.setItem("userRecords", JSON.stringify(userRecords))
  }

}
