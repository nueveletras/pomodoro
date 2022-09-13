import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { TaskModel } from "../../../modules/task/shared/models/task.model";
import * as taskAction from "./task.actions"

@Injectable()
export class TaskEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) { }

  search$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(taskAction.searchTasks),
        switchMap(({ action }) =>
          this.http.get(action.url).pipe(
            map((tasks) => {
              let bufferTask: TaskModel[] = tasks as TaskModel[]
              bufferTask.map(_task => _task.creationDate = new Date(_task.creationDate))

              return taskAction
                .searchTasksSuccess({ tasks: bufferTask })
            }
            )
          )
        ),
        catchError((error) => of(taskAction.setError({ error })))
      )
    }
  )

  create$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(taskAction.createTask),
        switchMap(({ action }) =>
          this.http.post(action.url, action.payload).pipe(
            map((currentTask) => taskAction
              .createTaskSuccess({ currentTask: currentTask as TaskModel }))
          )
        ),
        catchError((error) => of(taskAction.setError({ error })))
      )
    }
  )
}
