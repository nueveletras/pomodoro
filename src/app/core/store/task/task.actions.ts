import { createAction, props } from "@ngrx/store";
import { ApiActionModel } from "../../models/api-action-model";
import { TaskModel } from "../../../modules/task/shared/models/task.model";

export const createTask = createAction(
  '[Task] create',
  props<{ action: ApiActionModel<TaskModel> }>()
)

export const createTaskSuccess = createAction(
  '[Task] create success',
  props<{ currentTask: TaskModel }>()
)

export const searchTasks = createAction(
  '[Task] search all',
  props<{ action: ApiActionModel<TaskModel> }>()
)

export const searchTasksSuccess = createAction(
  '[Task] search all success',
  props<{ tasks: TaskModel[] }>()
)

export const setError = createAction(
  '[Task] error',
  props<{ error: string }>()
)
