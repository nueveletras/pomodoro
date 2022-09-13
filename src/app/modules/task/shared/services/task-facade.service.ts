import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import * as fromActions from '@store/task/task.actions'
import * as fromReducer from '@store/task/task.reducer'
import { Store } from "@ngrx/store"
import { environment } from 'src/environments/environment';
import { IAuxiliarMethods } from '@interfaces/auxiliar.methods.interface';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskFacadeService implements IAuxiliarMethods {

  constructor(
    private store: Store<fromReducer.State>
  ) { }

  getMessage(): Observable<string> {
    return this.store.select(fromReducer.getMessage).pipe(
      filter(message => !!message && message !== "")
    )
  }

  getError(): Observable<string> {
    return this.store.select(fromReducer.getError)
  }

  getLoading(): Observable<boolean> {
    return this.store.select(fromReducer.getLoading)
  }

  search(idUser: string): void {
    let action = {
      url: `${environment.url}/tasks/${idUser}`
    }
    this.store.dispatch(fromActions.searchTasks({ action }))
  }

  getAll(): Observable<TaskModel[]> {
    return this.store.select(fromReducer.getTasks).pipe(
      filter(tasks => !!tasks.length)
    )
  }
  create(idUser: string, task: TaskModel): void {
    let action = {
      url: `${environment.url}/tasks/${idUser}`,
      payload: task
    }
    this.store.dispatch(fromActions.createTask({ action }))
  }

}
