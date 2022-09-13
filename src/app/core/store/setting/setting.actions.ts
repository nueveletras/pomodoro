import { createAction, props } from "@ngrx/store";
import { ApiActionModel } from "../../models/api-action-model";
import { SettingModel } from "../../../modules/pomodoro/shared/models/setting.model";

export const createSetting = createAction(
  '[Setting] create default',
  props<{ action: ApiActionModel<SettingModel> }>()
)

export const createSettingSuccess = createAction(
  '[Setting] create default success',
  props<{ userSetting: SettingModel }>()
)

export const updateSetting = createAction(
  '[Setting] update default',
  props<{ action: ApiActionModel<SettingModel> }>()
)

export const updateSettingSuccess = createAction(
  '[Setting] update default success',
  props<{ userSetting: SettingModel }>()
)

export const searchSetting = createAction(
  '[Setting] search',
  props<{ action: ApiActionModel<SettingModel> }>()
)

export const searchSettingSuccess = createAction(
  '[Setting] search success',
  props<{ userSetting: SettingModel }>()
)

export const setError = createAction(
  '[Setting] set error',
  props<{ error: string }>()
)

export const setNewUser = createAction(
  '[Setting] set new user',
  props<{ newUser: boolean }>()
)
