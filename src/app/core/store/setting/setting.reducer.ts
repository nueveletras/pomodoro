import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { StateExtends } from "../../interfaces/states-extends.interface";
import { SettingModel } from "../../../modules/pomodoro/shared/models/setting.model";
import * as settingAction from "./setting.actions";

export interface State extends StateExtends{
  userSetting: SettingModel | null,
  newUser: boolean
}

const initialState: State = {
  userSetting: null,
  error: "",
  message: "",
  loading: false,
  newUser: false
}

const settingReducer = createReducer(
  initialState,
  on(
    settingAction.createSetting,
    (state) => ({
      ...state,
      loading: true
    })
  ),

  on(
    settingAction.createSettingSuccess,
    (state, { userSetting }) => ({
      ...state,
      userSetting,
      loading: false,
      message: "Te hemos creado una configuración por defecto de manera existosa ;)"
    })
  ),

  on(
    settingAction.updateSetting,
    (state) => ({
      ...state,
      loading: true
    })
  ),

  on(
    settingAction.updateSettingSuccess,
    (state, { userSetting }) => ({
      ...state,
      userSetting,
      loading: false,
      message: `${new Date().toUTCString()} Hemos actualizado tu configuración con exito`
    })
  ),

  on(
    settingAction.searchSetting,
    (state) => ({
      ...state,
      loading: true
    })
  ),

  on(
    settingAction.searchSettingSuccess,
    (state, { userSetting }) => ({
      ...state,
      userSetting,
      loading: false,
      message: "Hemos obtenido tu configuración con exito ;)"
    })
  ),

  on(
    settingAction.setError,
    (state, { error }) => ({
      ...state,
      error,
      loading: false
    })
  ),

  on(
    settingAction.setNewUser,
    (state, { newUser }) => ({
      ...state,
      newUser,
      loading: false
    })
  )
)

export function reducer(state: State | undefined, action: Action) {
  return settingReducer(state, action)
}

export const FEATURE_KEY = 'settingFeature'
export const selectSettingState = createFeatureSelector<State>(FEATURE_KEY)

export const getMessage = createSelector(selectSettingState, (state: State) => state.message)
export const getError = createSelector(selectSettingState, (state: State) => state.error)
export const getLoading = createSelector(selectSettingState, (state: State) => state.loading)
export const getSetting = createSelector(selectSettingState, (state: State) => state.userSetting)
export const setNewUser = createSelector(selectSettingState, (state: State) => state.newUser)
