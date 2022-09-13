import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { StateExtends } from "../../interfaces/states-extends.interface";
import { TaskModel } from "../../../modules/task/shared/models/task.model";
import * as taskAction from "./task.actions"

export interface State extends StateExtends {
  currentTask: TaskModel | null,
  tasks: TaskModel[]
}

const initialState: State = {
  currentTask: null,
  tasks: [],
  error: "",
  message: "",
  loading: false,
}

const taskReducer = createReducer(
  initialState,
  on(
    taskAction.createTask,
    (state) => ({
      ...state,
      loading: true
    })
  ),
  on(
    taskAction.createTaskSuccess,
    (state, { currentTask }) => ({
      ...state,
      currentTask,
      tasks: [...state.tasks, currentTask],
      loading: false,
      message: `${new Date().toUTCString()} Hemos agregado un pomodoro exitosamente`
    })
  ),
  on(
    taskAction.searchTasks,
    (state) => ({
      ...state,
      loading: true
    })
  ),
  on(
    taskAction.searchTasksSuccess,
    (state, { tasks }) => {
      return ({
      ...state,
      tasks,
      loading: false
    })
  }
  )
)

export function reducer(state: State | undefined, action: Action) {
  return taskReducer(state, action)
}

export const FEATURE_KEY = 'taskFeature'
export const selectTaskState = createFeatureSelector<State>(FEATURE_KEY)

export const getTasks = createSelector(selectTaskState, (state: State) => state.tasks)
export const getLoading = createSelector(selectTaskState, (state: State) => state.loading)
export const getMessage = createSelector(selectTaskState, (state: State) => state.message)
export const getError = createSelector(selectTaskState, (state: State) => state.error)
