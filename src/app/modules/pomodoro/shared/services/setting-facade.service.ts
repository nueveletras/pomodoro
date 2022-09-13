import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from "@ngrx/store";
import * as fromAction from '@store/setting/setting.actions'
import * as fromReducer from '@store/setting/setting.reducer'
import { Observable } from 'rxjs';
import { IAuxiliarMethods } from '@interfaces/auxiliar.methods.interface';
import { SettingModel } from '../models/setting.model';
import { ApiActionModel } from 'src/app/core/models/api-action-model';

@Injectable({
  providedIn: 'root'
})
export class SettingFacadeService implements IAuxiliarMethods{

  constructor(
    private store: Store<fromReducer.State>
  ) { }

  private action: ApiActionModel<SettingModel> = {
    url: `${environment.url}/settings`
  }

  search(idUser: string) {
    let action = {
      url: `${this.action.url}/${idUser}`
    }
    this.store.dispatch(fromAction.searchSetting({action: action}))
  }

  create(idUser: string) {
    // Default
    //   longBreak: 25,
    //   focusTime: 25,
    //   break: 15,
    //   rounds: 4
    let action = {
      url: `${this.action.url}/${idUser}`
    }
    this.store.dispatch(fromAction.createSetting({action: action}))
  }

  update(idUser: string, setting: SettingModel) {
    let action = {
      url: `${this.action.url}/${idUser}`,
      payload: setting
    }
    this.store.dispatch(fromAction.updateSetting({action: action}))
  }

  getSetting(): Observable<SettingModel | null> {
    return this.store.select(fromReducer.getSetting)
  }

  getMessage(): Observable<string> {
    return this.store.select(fromReducer.getMessage)
  }

  getError(): Observable<string> {
    return this.store.select(fromReducer.getError)
  }

  getLoading(): Observable<boolean> {
    return this.store.select(fromReducer.getLoading)
  }

  setNewUser(): Observable<boolean> {
    return this.store.select(fromReducer.setNewUser)
  }

}
