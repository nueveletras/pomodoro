import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { SettingModel } from "../../../modules/pomodoro/shared/models/setting.model";
import * as fromAction from "./setting.actions";

@Injectable()
export class SettingEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {

  }

  search$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromAction.searchSetting),
        switchMap(({ action }) =>
          this.http.get(action.url).pipe(
            map((setting) => fromAction
              .searchSettingSuccess({ userSetting: setting as SettingModel }))
          )
        ),
        catchError((error: HttpErrorResponse) => {
          if (error.error.withoutSetting) {
            return of(fromAction.setNewUser({ newUser: true }))
          } else {
            return of(fromAction.setError({ error: error.error.message }))
          }
        }
        )
      )
    }
  )

  update$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromAction.updateSetting),
        switchMap(({ action }) =>
          this.http.put(action.url, action.payload).pipe(
            map((setting) => fromAction
              .updateSettingSuccess({ userSetting: setting as SettingModel }))
          )
        ),
        catchError((error: HttpErrorResponse) =>
          of(fromAction.setError({ error: error.error.message }))
        )
      )
    }
  )

  create$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromAction.createSetting),
        switchMap(({ action }) =>
          this.http.post(action.url, action.payload).pipe(
            map((setting) => fromAction
              .createSettingSuccess({ userSetting: setting as SettingModel }))
          )
        ),
        catchError((error: HttpErrorResponse) =>
          of(fromAction.setError({ error: error.error.message }))
        )
      )
    }
  )


}
