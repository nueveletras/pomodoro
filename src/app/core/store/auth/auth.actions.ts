import { createAction, props } from "@ngrx/store";
import { User } from "firebase/auth";

export const setUser = createAction(
  '[Auth] set user',
  props<{ user: User }>()
)
