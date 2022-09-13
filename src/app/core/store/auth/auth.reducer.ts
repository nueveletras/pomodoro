import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { User } from 'firebase/auth';
import * as authActions from './auth.actions'

export interface State {
  user: User | null
}

const initialState: State = {
  user: null
}

const authReducer = createReducer(
  initialState,
  on(authActions.setUser, (state, { user }) => ({
    ...state,
    user
  }))
)

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action)
}

export const FEATURE_KEY = 'authFeature'
export const selectAuthState = createFeatureSelector<State>(FEATURE_KEY)

export const getUser = createSelector(selectAuthState, (state: State) => state.user)
